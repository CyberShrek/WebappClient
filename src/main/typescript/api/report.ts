import {SimpleHttp} from "./http/SimpleHttp"
import {serverLocations} from "../properties"

export async function getReportMatrix(queryId: string, formValues: { [fieldId: string]: any }): Promise<Matrix> {

    const exportValues: typeof formValues = {};

    Object.keys(formValues).forEach(
        key => {
            exportValues[key] = (typeof formValues[key] === 'object' && formValues[key] !== null && !Array.isArray(formValues[key]))
                ? Object.keys(formValues[key])
                : formValues[key]
        }
    )

    const data = await SimpleHttp
        .withHeaders({"Query-Id": queryId})
        .andBody(exportValues)
        .post(serverLocations.query)
        .json<(string | number | boolean)[][]>()

    return {
        head: data[0].map(item => String(item)),
        data: data.slice(1)
    }
}

export async function downloadReport(document: ExportableDocument) {
    download(await SimpleHttp
        .withHeaders()
        .andBody(document)
        .post(serverLocations.export)
        .blob(), document.title)
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