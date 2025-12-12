import {addCursorLoader, removeCursorLoader} from "../../util/dom"
import {popupError} from "../../util/alert"
import {serverErrors, serverLocations} from "../../properties"


export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
export type ResourceType = "json" | "text" | "blob"

export type Headers = {[key: string]: string}
export type Payload = object

export abstract class Http {

    protected static get     = (url: string,
                                headers?: Headers,
                                type?: ResourceType) => Http.send(url,"GET", headers, undefined, type)

    protected static put     = (url: string,
                         headers?: Headers,
                         payload?: Payload,
                                type?: ResourceType) => Http.send(url,"PUT", headers, payload,        type)

    protected static post    = (url: string,
                         headers?: Headers,
                         payload?: Payload,
                                type?: ResourceType) => Http.send(url,"POST", headers, payload,        type)

    protected static delete  = (url: string,
                         headers?: Headers,
                         payload?: Payload,
                                type?: ResourceType) => Http.send(url,"DELETE", headers, payload,        type)

    protected static async send(url: string,
                       method: Method,
                       headers?: Headers,
                       payload?: Payload,
                                type: ResourceType = "json")
    {
        addCursorLoader()
        let response = await fetch(
            url, {
                method,
                headers: prepareHeaders(headers ?? {}),
                body: payload ? JSON.stringify(payload) : ""
            })
            .finally(() => removeCursorLoader())
        if(response.ok) {
            return await response[type]()
        }
        else {
            const error = new Error(await response.text())
            error.name = `${response.status}: ${response.statusText}`
            await popupError(error, serverErrors[Object.keys(serverLocations).find(key => serverLocations[key] === url) ?? -1])
            throw error
        }
    }
}

function prepareHeaders(headers: {[key: string]: string}) {
    Object.keys(headers)
        .forEach(key => headers[key] = encodeURIComponent(headers[key]))

    return {
        "Content-Type"  : "application/json;charset=UTF-8",
        // "Code"          :  appConfig.code ?? "",
        ...headers
    }
}