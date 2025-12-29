import {SimpleHttp} from "./http/SimpleHttp";
import {serverLocations} from "../properties";

export async function fetchMatrix(queryId: string, body: { [paramId: string]: any }): Promise<Matrix> {

    const data = await SimpleHttp
        .withHeaders({"Query-Id": queryId})
        .andBody(body)
        .post(serverLocations.query)
        .json<(string | number | boolean)[][]>()

    return {
        head: data[0].map(item => String(item)),
        data: data.slice(1)
    }
}