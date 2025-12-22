import {store} from "../../store";
import {isEmpty} from "../../util/data";

export class DocumentExport {


    constructor() {}

    public fields: Fields = {}

    public reportCallbacks: (() => (ExportableReport))[] = []

    export(defaultReportTitle?: string): ExportableDocument {
        const form: ExportableDocument["form"] = {}
        Object.values(this.fields).forEach(field => {
            const section: string = field.sectionTitle ?? ""

            if (!form[section])
                form[section] = {}

            form[section][field.title] = field.prettyValue ?? ""
        })
        console.log("reportCallbacks", this.reportCallbacks)
        return {
            title:  store.appInfo?.name ?? "",
            form,
            report: this.reportCallbacks.map(fn => {
                const report = fn?.()
                if (isEmpty(report.title) && defaultReportTitle)
                    report.title = defaultReportTitle
                return report
            })
        }
    }
}