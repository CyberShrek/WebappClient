import {serverLocations} from "../properties"
import {SimpleHttp} from "./http/SimpleHttp"


export async function getOptionsFromSB(listName: string,
                                       optionKeyName: string,
                                       optionValueName: string,
                                       params: { [key: string]: any} = {},
                                       filter: (item: { [key: string]: string | number | boolean | null }) => boolean = () => true): Promise<Options> {
    return getCallbackOptionsFromSB(listName,
            item => String(item[optionKeyName]),
            item => String(item[optionValueName]),
        params,
        filter)
}

export async function getCallbackOptionsFromSB(listName: string,
                                               optionKeyCallback: (item: { [key: string]: string | number | boolean | null }) => string,
                                               optionValueName: (item: { [key: string]: string | number | boolean | null }) => string,
                                               params: { [key: string]: any } = {},
                                               filter: (item: { [key: string]: string | number | boolean | null }) => boolean = () => true): Promise<Options> {

    const options: { [key: string]: string } = {}
    const sbResponse = await SimpleHttp
        .withBody(JSON.parse(`{"${listName}":[${JSON.stringify(params)}]}`))
        .post(serverLocations.serviceBank)
        .json<{ [key: string]: ({ [key: string]: string })[] }>()

    sbResponse[listName]
        .filter(filter)
        .forEach(item => {
            const key = optionKeyCallback(item)
            const value = optionValueName(item)
            if (key != null)
                options[key] = value
        })
    return options
}