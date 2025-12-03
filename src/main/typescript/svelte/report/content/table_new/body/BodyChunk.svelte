<script lang="ts">

    import TotalRow from "./TotalRow.svelte"
    import Button from "../../../../input/Button.svelte"
    import Switch from "../../../../input/Switch.svelte";

    export let
        chunk: BodyChunk,
        collapsed: boolean = false

    let collapsedChunks: boolean[] = []

    $: chunking = chunk.table.config.chunking
    $: nesting = chunk.nesting

    // Передача свойства collapsed дочерним чанкам
    // const collapseChunks = () => collapsedChunks = childChunks.map(() => true)
    // const expandChunks = () => collapsedChunks = childChunks.map(() => false)
    // $: collapsed ? collapseChunks() : expandChunks()

</script>

{#if chunking && chunk.childChunks?.length > 0}
    {#each chunk.childChunks as childChunk, chunkIndex}

        <!-- CHUNK HEAD -->
        {#if childChunk.rows.length > 1}
            <tr class:collapsed>
                {#if chunk.table.config.addCheckboxes}
                    <td/>
                {/if}
                {#each Array(nesting) as _}
                    <td/>
                {/each}
                <td>
                    <slot name="cell"
                          cell={childChunk.totalRow.cells[nesting]}/>
                    {#if chunking === "collapsable" || chunking === "full"}
                        <Button text={collapsedChunks[chunkIndex] ? '▼' : '▲'}
                                hint={collapsedChunks[chunkIndex] ? 'Развернуть' : 'Свернуть'}
                                on:click={() => collapsedChunks[chunkIndex] = !collapsedChunks[chunkIndex]}
                                design="frameless"
                                size="small"/>
                    {/if}
                </td>
            </tr>
        {/if}

        <!-- CHUNK BODY -->
        <svelte:self
                chunk={childChunk}
                collapsed={!!collapsedChunks[chunkIndex]}>
            <svelte:fragment slot="cell" let:cell>
                <slot name="cell" {cell}/>
            </svelte:fragment>
        </svelte:self>

        <!-- CHUNK TOTAL -->
        {#if (chunking === "totals" || chunking === "full" || chunking === "collapsable") && childChunk.rows.length > 1}
            <TotalRow totalRow={childChunk.totalRow}>
                <svelte:fragment slot="cell" let:cell>
                    <slot name="cell" {cell}/>
                </svelte:fragment>
            </TotalRow>
        {/if}
    {/each}
{:else}
    {#each chunk.rows as row}
        <tr class:collapsed>
            {#if chunk.table.config.addCheckboxes}
                <td>
                    <Switch type="checkbox"/>
                </td>
            {/if}
            {#each row.cells as cell, columnIndex}
                <td>
                    {#if columnIndex >= nesting || columnIndex === nesting - 1 && chunk.rows.length === 1}
                        <slot name="cell" {cell}/>
                    {/if}
                </td>
            {/each}
        </tr>
    {/each}
{/if}

<style>
    td {
        border-right: var(--light-border);
        border-bottom: var(--light-border);
    }

    :global(tr *) {
        transition: 0.2s all;
    }

    :global(tr.collapsed *) {
        opacity: 0   !important;
        height: 0    !important;
        font-size: 0 !important;
        padding: 0   !important;
        border: none !important;
    }
</style>