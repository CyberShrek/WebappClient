<script lang="ts">

    import "../../../resources/css/global.css"
    import Header from "./Header.svelte"


    export let
        appInfo: AppInfo

</script>

<Header {appInfo}/>

<slot/>