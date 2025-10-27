<script lang="ts">

    import ReportHeader from "./ReportHeader.svelte"

    export let
        title    = "Отчёт",
        modal    = false,
        allowTablesExport = false,
        allowChartsExport = false,
        isLoaded: boolean | null = null

    let reportRootElement: HTMLDivElement,
        isCollapsed  = false,
        isFullScreen = false

</script>

<div class="report"
     bind:this={reportRootElement}>

    <ReportHeader {title}
                  {reportRootElement}
                  {modal}
                  {allowTablesExport}
                  {allowChartsExport}
                  {isLoaded}
                  bind:isCollapsed
                  bind:isFullScreen/>

    <div class="body">
        <slot/>
    </div>
</div>
<!--{JSON.stringify(formValue)}-->

<style>
    .report {
        display: flex;
        flex-direction: column;
        min-height: var(--report-header-height);
        background: white;
        height: min-content;
        /*     padding: var(--indent); */
        gap: var(--indent);
        border-radius: var(--outer-border-radius);
    }

    .report > .body{
        display: grid;
        gap: var(--indent);
    }
</style>
