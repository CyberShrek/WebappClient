<script lang="ts">

    import {exportAsJpeg, getFullscreenElement, toggleFullscreen} from "../../util/dom"
    import {popupRadioAction, popupTimeoutAction} from "../../util/alert"
    import {ExportReport} from "../../model/export/ExportReport"
    import {TableModel} from "../../model/export/TableModel"
    import {downloadReport} from "../../api/report"
    import Button from "../input/Button.svelte"
    import Loading from "../misc/Loading.svelte"

    export let
        reportRootElement: HTMLDivElement,
        title: string,
        modal = false,
        allowTablesExport = false,
        allowChartsExport = false,
        isCollapsed  = false,
        isFullScreen = false,
        isLoaded     = null

    window.addEventListener("fullscreenchange", () => {
        isFullScreen = getFullscreenElement() === reportRootElement
    })

    function tryExport() {
        // type option = "tables" | "charts"
        // const radios: { [key in option]?: string } = {}

        popupTimeoutAction("Экспортировать отчёт?", "Подтвердить", () => {
            if(allowTablesExport)
                exportTables()
            // radios.tables = "Таблицы"
            if(allowChartsExport)
                exportCharts()
            // radios.charts = "Графики"
        })



        // if(Object.keys(radios).length > 0)
        //     popupRadioAction("Экспорт отчёта", "Выберите вариант", radios, "Получить", (value: option) => {
        //         switch (value) {
        //             case "tables": exportTables(); break
        //             case "charts": exportCharts()
        //         }
        //     })
    }

    function exportTables() {
        reportRootElement?.querySelectorAll(".body .content table")?.forEach((tableBlock: Element, i) => {
            const report = new ExportReport(title)
            report.addTable(new TableModel(title, tableBlock as HTMLTableElement))
            downloadReport(report.toJson())
        })
    }
    function exportCharts() {
        reportRootElement?.querySelectorAll(".body .content .charts")?.forEach((chartsBlock, i) => {
            const content = chartsBlock.closest(".content")
            if (content)
                exportAsJpeg((content as HTMLElement), "Графики")
        })
    }

</script>

<div class="header">
    <h2>
        {title}
    </h2>
    {#if isLoaded === false}
        <Loading/>
    {:else if isLoaded === true}
        <!--{#if !modal}-->
        <!--    <ToTopButton/>-->
        <!--{/if}-->
        <!--{#if report.hasCharts && report.hasTables}-->
        <!--    <Button image="graph.svg"-->
        <!--            disabled={collapsed}-->
        <!--            hint="Графическое представление"-->
        <!--            on:click={() => showCharts = !showCharts}/>-->
        <!--{/if}-->
        {#if allowTablesExport || allowChartsExport}
            <Button image="download.svg"
                    hint="Экспортировать"
                    on:click={tryExport}/>
        {/if}
        <!--{#if !modal}-->
        <!--    <Button image="collapse.svg"-->
        <!--            hint={isCollapsed ? "Развернуть" : "Свернуть"}-->
        <!--            on:click={() => isCollapsed = !isCollapsed}/>-->
        <!--{/if}-->
        <Button image={isFullScreen ? "restore.svg" : "expand.svg"}
                hint={isFullScreen ? "Нормальный вид" : "На весь экран"}
                on:click={() => toggleFullscreen(reportRootElement)}/>
        {#if modal}
            <Button image="close.svg"
                    hint="Закрыть"
                    on:click={() => window.dispatchEvent(new KeyboardEvent("keydown",{ key: "Escape" }))}/>
        {/if}
    {/if}
</div>

<style>
    .header {
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