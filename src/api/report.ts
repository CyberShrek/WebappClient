import {ExportableReport} from "../model/export/ExportableReport"
import {SimpleHttp} from "./http/SimpleHttp"
import {serverLocations} from "../properties"

export function getReportData(queryId: string, formValues: { [fieldId: string]: any }) {
    // Object.keys(formValues).forEach(
    //     key => {
    //         if (typeof formValues[key] === 'object' && formValues[key] !== null && !Array.isArray(formValues[key]))
    //             formValues[key] = Object.keys(formValues[key])
    //     }
    // )

    return SimpleHttp
        .withHeaders({"Query-Id": queryId})
        .andBody(formValues)
        .post(serverLocations.query)
        .json<(string | number | boolean)[][]>()
}

export async function downloadReport(report: ExportableReport) {
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


