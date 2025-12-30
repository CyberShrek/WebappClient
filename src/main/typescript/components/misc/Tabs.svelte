<script lang="ts">

    export let
        tabs: string[] = [],
        pickedTab: string

    $: indices = Array.from(Array(tabs.length).keys()).map(index => Number(index))

</script>

<div class="tabs">
    <div class="header">
        {#each indices as index}
            <button class="tab"
                    class:active={pickedTab === tabs[index]}
                    on:click={() => pickedTab = tabs[index]}>{tabs[index]}</button>
        {/each}
    </div>

    <div class="content">
        <slot/>
    </div>
</div>

<style>
    .tabs {
        display: flex;
        flex-direction: column;
        width: 100%;
        background: white;
        border-radius: var(--outer-border-radius);
    }

    .tabs > .header {
        display: flex;
        padding: var(--light-indent);
        padding-bottom: 0;
        width: auto;
        gap: var(--light-indent);
        border-bottom: 5px solid var(--accent-color);
        overflow-y: auto;
    }
    .tabs > .header > .tab {
        font-size: medium;
        height: calc(var(--input-height));
        padding: var(--indent) var(--strong-indent);
        background: white;
        border-radius: var(--border-radius);
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        white-space: nowrap;
    }
    .tabs > .header > .tab.active {
        color: white;
        background: var(--accent-color);
    }
</style>