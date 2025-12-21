
export class DocumentExport {

    constructor(public readonly title: string,
                private readonly formFields: Fields,
                ...reportCallbacks: (() => (ExportableReport))[]) {
        this.reportCallbacks = reportCallbacks
    }

    public reportCallbacks: (() => (ExportableReport))[]

    export(): ExportableDocument {
        const form = {}
        Object.values(this.formFields).forEach(field => {
            const section = field.sectionTitle

            if (!form[section])
                form[section] = {}

            form[section][field.title] = field.prettyValue
        })
        console.log("reportCallbacks", this.reportCallbacks)
        return {
            title:  this.title,
            form,
            report: this.reportCallbacks.map(fn => fn?.())
        }
    }
}