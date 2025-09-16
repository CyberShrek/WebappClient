<script lang="ts">

    import ReportHeader from "./ReportHeader.svelte"
    import Loading from "../misc/Loading.svelte"
    import {resolveStyle} from "../../util/resolver";

    export let
        title    = "Отчёт",
        modal    = false,
        isLoaded = null

    let reportRootElement: HTMLDivElement,
        isCollapsed  = false,
        isFullScreen = false

</script>

{#await resolveStyle("report")}
    <Loading/>
{:then _}

    <div class="report"
         bind:this={reportRootElement}>

        <ReportHeader {title}
                      {reportRootElement}
                      {modal}
                      {isLoaded}
                      bind:isCollapsed
                      bind:isFullScreen/>

        <div class="body">
            <slot/>
        </div>
    </div>

{/await}
<!--{JSON.stringify(formValue)}-->
