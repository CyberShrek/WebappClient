<script lang="ts">

    import {blur} from "svelte/transition"

    import FullscreenButton from "./buttons/FullscreenButton.svelte"
    import CollapseButton from "./buttons/CollapseButton.svelte"
    import DownloadButton from "./buttons/DownloadButton.svelte"
    import ToTopButton from "./buttons/ToTopButton.svelte"
    import {downloadReport} from "../../api/report"
    import {DocumentExport} from "../../model/export/DocumentExport"
    import {scrollIntoElement} from "../../util/dom";

    export let
        title      = "Отчёт",
        show       = false,
        modal      = false,
        collapsed  = false,
        fullscreen = false,
        documentExport: DocumentExport | null = null,

        data: any // Only for trigger scrollIntoElement


    let element: HTMLDivElement

    $: if (fullscreen)
        collapsed = false

    $: if (show && element && data)
        scrollIntoElement(element)

</script>

<div class="report"
     class:show
     class:modal
     class:collapsed
     class:fullscreen
     bind:this={element}>

    <div class="header">
        <p>
            {title}
        </p>
        {#if show}
            <div class="buttons"
            transition:blur>
                {#if !fullscreen && !modal}
                    <ToTopButton/>
                {/if}
                {#if !collapsed}
                    <slot name="buttons"/>
                {/if}
                {#if !collapsed && !!documentExport}
                    <DownloadButton on:confirm={() => downloadReport(documentExport.export(title), title)}/>
                {/if}
                {#if !fullscreen && !modal}
                    <CollapseButton bind:collapsed/>
                {/if}

                <FullscreenButton targetElement={element}
                                  bind:fullscreen/>
            </div>
        {/if}
    </div>

    {#if show && !collapsed}
        <div class="body"
             transition:blur>
            <slot/>
        </div>
    {/if}
</div>
<!--{JSON.stringify(formValue)}-->

<style>

    :root {
        --report-header-full-height: 60px;
        --report-header-height: calc(var(--report-header-full-height) - 2 * var(--light-indent));
    }

    .report {
        display: flex;
        flex-direction: column;
        min-height: var(--report-header-height);
        background: white;
        height: min-content;
        padding: var(--light-indent) 0;
        gap: var(--light-indent);
        border-radius: var(--outer-border-radius);
        /*overflow-x: scroll;*/
    }
    .report:not(.show) {
        overflow: hidden;
        opacity: 0.5;
    }
    .report.fullscreen {
        overflow-y: scroll;
        padding: 0;
    }

    .report > .header {
        display: flex;
        position: sticky;
        z-index: 1;
        top: 0;
        width: auto;
        height: var(--report-header-height);
        align-items: center;
        padding: 0 var(--light-indent);
        background: RGBA(255, 255, 255, 0.3);
    }
    .report:not(.modal) > .header {
        /*Blur*/
        backdrop-filter: blur(6px)  !important;
        -webkit-backdrop-filter: blur(6px) !important;
    }
    .report.fullscreen > .header {
        background: white;
        padding-top: var(--indent);
        padding-bottom: var(--indent);
        /*top: calc(-1 * var(--indent));*/
    }
    .report:not(.collapsed) > .header {
        /*border-bottom: var(--light-border);*/
    }
    .header > p{
        margin-right: auto;
        font-size: 22px;
        padding: 0 var(--indent);
    }
    .header > .buttons{
        display: flex;
        margin-left: auto;
        padding: 0 var(--light-indent);
        gap: 0;
    }
    .header > .buttons > :global(button) {
        margin-left: var(--light-indent);
    }

    .report > .body {
        display: flex;
        flex-direction: column;
        gap: var(--indent);
        margin-bottom: var(--outer-border-radius);
    }
</style>
