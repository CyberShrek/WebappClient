<script lang="ts">

    import FullscreenButton from "./buttons/FullscreenButton.svelte"
    import CollapseButton from "./buttons/CollapseButton.svelte"

    export let
        title        = "Отчёт",
        isReady      = true,
        isCollapsed  = false

    let rootElement: HTMLDivElement

</script>

<div class="report"
     bind:this={rootElement}>

    <div class="header">
        <h2>
            {title}
        </h2>
        {#if isReady}
            <div class="buttons">
                <slot name="buttons"/>
                <CollapseButton bind:isCollapsed/>
                <FullscreenButton {rootElement}/>
            </div>
        {/if}
    </div>

    {#if isReady && !isCollapsed}
        <div class="body">
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
        max-height: 100vh;
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
        gap: var(--light-indent);
    }

    .report > .body {
        display: grid;
        gap: var(--indent);
        overflow: auto;
        margin-bottom: var(--outer-border-radius);
    }
</style>
