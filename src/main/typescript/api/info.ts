import {SimpleHttp} from "./http/SimpleHttp"
import {serverLocations} from "../properties"
import {Http} from "./http/Http";

export function getUserInfo(): Promise<UserInfo> {

    return fetch(serverLocations.userinfo, {
        headers: {
            "Content-Type"  : "application/json;charset=UTF-8",
            "App-Code"      :  Http.appCode
        },
        cache: "no-cache"
    })
        .then(response => response.json())
        .then(data => {
            return data as UserInfo
        })

    // return SimpleHttp
    //     .justGet(serverLocations.userinfo)
    //     .json<UserInfo>()
}

export function getAppInfo(): Promise<AppInfo> {
    return fetch(serverLocations.appinfo, {
        headers: {
            "Content-Type"  : "application/json;charset=UTF-8",
            "App-Code"      :  Http.appCode
        },
        cache: "no-cache"
    })
        .then(response => response.json())
        .then(data => {
            return data as AppInfo
        })

    // return SimpleHttp
    //     .justGet(serverLocations.appinfo)
    //     .json<AppInfo>()
}