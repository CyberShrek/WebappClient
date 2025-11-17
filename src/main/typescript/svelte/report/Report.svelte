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

    <div class="header">

    </div>

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

    .report > .header {
        display:flex;
        width: auto;
        height: var(--report-header-height);
        align-items: center;
        margin: var(--indent);
        background: var(--solid-color);
        border-radius: var(--border-radius);
    }
    .header > h2{
        margin-right: auto;
        padding: 0 var(--strong-indent);
    }
</style>
