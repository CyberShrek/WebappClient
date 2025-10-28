import {ExportReport} from "../model/export/ExportReport"
import {SimpleHttp} from "./http/SimpleHttp"
import {serverLocations} from "../properties"

export function getReportData(queryId: string, formValues: { [fieldId: string]: any }) {

    const exportValues: typeof formValues = {};

    Object.keys(formValues).forEach(
        key => {
            exportValues[key] = (typeof formValues[key] === 'object' && formValues[key] !== null && !Array.isArray(formValues[key]))
                ? Object.keys(formValues[key])
                : formValues[key]
        }
    )

    return SimpleHttp
        .withHeaders({"Query-Id": queryId})
        .andBody(exportValues)
        .post(serverLocations.query)
        .json<(string | number | boolean)[][]>()
}

export async function downloadReport(report: ExportReport) {
    download(await SimpleHttp
        .withHeaders()
        .andBody(report)
        .post(serverLocations.export)
        .blob(), report.title)
}

function download(blob: Blob, name: string) {
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = name;
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}