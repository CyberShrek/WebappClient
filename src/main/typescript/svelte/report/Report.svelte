<script lang="ts">

    import {slide} from "svelte/transition"

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
     bind:this={rootElement}>

    <div class="header">
        <h2>
            {title}
        </h2>
        {#if isReady}
            <div class="buttons">

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
    .report {
        display: flex;
        flex-direction: column;
        min-height: var(--report-header-height);
        background: white;
        height: min-content;
        border-radius: var(--outer-border-radius);
    }

    .report > .header {
        display:flex;
        width: auto;
        height: 50px;
        align-items: center;
        margin: var(--indent);
        border-radius: var(--border-radius);
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
        max-height: 100vh;
        margin-bottom: var(--outer-border-radius);
        border-top: var(--light-border);
    }
</style>
