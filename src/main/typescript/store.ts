import {getAppInfo, getUserInfo} from "./api/info"

export let store: {
    appInfo: AppInfo,
    userInfo: UserInfo
}

export const loadStore = async () => {
    store = {
        appInfo: await getAppInfo(),
        userInfo: await getUserInfo()
    }
}

