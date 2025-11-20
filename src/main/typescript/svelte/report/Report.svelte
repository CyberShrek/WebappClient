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
                {#if !isFullscreen && !isCollapsed}
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
        --report-header-height: 50px;
    }

    .report {
        display: flex;
        flex-direction: column;
        min-height: var(--report-header-height);
        background: white;
        height: min-content;
        overflow: clip;
        border-radius: var(--outer-border-radius);
    }

    .report > .header {
        display: flex;
        position: sticky;
        top: 0;
        width: auto;
        min-height: var(--report-header-height);
        align-items: center;
        padding: var(--light-indent);
        background: white;
    }
    .report:not(.collapsed) > .header {
        border-bottom: var(--light-border);
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
        display: grid;
        gap: var(--indent);
        overflow: auto;
        margin-bottom: var(--outer-border-radius);
    }
</style>
