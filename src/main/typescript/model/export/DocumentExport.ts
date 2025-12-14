
export class DocumentExport implements ExportableDocument {

    constructor(public readonly title: string) {

    }

    _form: ExportableDocument["form"] = {}
    get form () {
        return this._form
    }

    get report(): (ExportableReport)[] {
        return this.reportCallbacks.map(fn => fn?.())
    }

    formValuesCallbacks: {
        [sectionfield: string]: () => string
    } = {}

    reportCallbacks: (() => (ExportableReport))[] = []

    saveForm() {
        this._form = {}
        Object.entries(this.formValuesCallbacks)
            .sort(([key1], [key2]) => key1.split("|")[0].localeCompare(key2.split("|")[0]))
            .forEach(([key, fn]) => {
            const split = key.split("|"),
                section = split[1],
                field = split[2]

            if (this._form[section] == null)
                this._form[section] = {}

            this._form[section]
                [field] = fn()
        })
    }

    export(): ExportableDocument {
        return {
            title: this.title,
            form: this.form,
            report: this.report
        }
    }
}