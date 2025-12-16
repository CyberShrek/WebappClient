<script lang="ts">

    import "../../../resources/css/global.css"
    import Header from "./Header.svelte"
    import {loadStore, store} from "../../store"
    import {Http} from "../../api/http/Http"
    import Loading from "../misc/Loading.svelte"

    export let appCode: string

    Http.appCode = appCode

    let storeLoadPromise: Promise<void> = loadStore()

</script>

{#await storeLoadPromise}
    <Loading/>
{:then _}
    <Header/>

    <slot/>
{/await}