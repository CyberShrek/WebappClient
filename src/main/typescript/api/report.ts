import {SimpleHttp} from "./http/SimpleHttp"
import {serverLocations} from "../properties"
import {fetchMatrix} from "./matrix";

export async function fetchReport(queryId: string, fields: Fields): Promise<Matrix> {

    const fieldValues: { [fieldId: string]: any } = {};

    Object.keys(fields).forEach(
        key => {
            const value = fields[key].value
            fieldValues[key] = (typeof value === 'object' && value !== null && !Array.isArray(value))
                ? Object.keys(value)
                : value
        }
    )

    return fetchMatrix(queryId, fieldValues)
}

export async function downloadReport(document: ExportableDocument, name?: string) {
    download(await SimpleHttp
        .withHeaders()
        .andBody(document)
        .post(serverLocations.export)
        .blob(), name ?? document.title)
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