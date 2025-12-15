<script lang="ts">

    import "../../../resources/css/global.css"
    import Header from "./Header.svelte"
    import {store} from "../../store"

    export let appCode: string

    store.appCode = appCode

    let appInfo: AppInfo


</script>

<Header {appInfo}/>

<slot/>