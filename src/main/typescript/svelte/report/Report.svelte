<script lang="ts">

    import {slide, blur} from "svelte/transition"

    import FullscreenButton from "./buttons/FullscreenButton.svelte"
    import CollapseButton from "./buttons/CollapseButton.svelte"
    import DownloadButton from "./buttons/DownloadButton.svelte"
    import ToTopButton from "./buttons/ToTopButton.svelte"

    export let
        title        = "Отчёт",
        isReady      = true,
        isCollapsed  = false,
        isFullscreen = false

    let rootElement: HTMLDivElement

    $: if (isFullscreen) {
        isCollapsed = false
    }

</script>

<div class="report"
     class:collapsed={isCollapsed}
     class:fullscreen={isFullscreen}
     bind:this={rootElement}>

    <div class="header">
        <h2>
            {title}
        </h2>
        {#if isReady}
            <div class="buttons"
            transition:blur>
                {#if !isFullscreen}
                    <ToTopButton/>
                {/if}
                {#if !isCollapsed}
                    <slot name="buttons"/>
                    <DownloadButton/>
                {/if}
                {#if !isFullscreen}
                    <CollapseButton bind:isCollapsed/>
                {/if}

                <FullscreenButton {rootElement} bind:isFullscreen/>
            </div>
        {/if}
    </div>

    {#if isReady && !isCollapsed}
        <div class="body"
             transition:slide>
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
        overflow: clip;
        padding: var(--light-indent) 0;
        gap: var(--light-indent);
        border-radius: var(--outer-border-radius);
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
        background: RGBA(255, 255, 255, 0.8);
        /*Blur*/
        backdrop-filter: blur(5px) !important;
        -webkit-backdrop-filter: blur(5px) !important;
    }
    .report.fullscreen > .header {
        padding-top: var(--indent);
        padding-bottom: var(--indent);
        /*top: calc(-1 * var(--indent));*/
    }
    .report:not(.collapsed) > .header {
        /*border-bottom: var(--light-border);*/
    }
    .header > h2{
        margin-right: auto;
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
