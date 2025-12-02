<script lang="ts">

    import TotalRow from "../TotalRow.svelte"
    import Button from "../../../../input/Button.svelte"
    import {Chunk} from "./Chunk"

    export let
        chunk: Chunk,
        collapsed: boolean = false

    let collapsedChunks: boolean[] = []

    // Дробление данных
    $: if (chunking && rows?.length > 1 && types?.[nesting + 1] === "string") {
        chunks = []
        let lastName: string
        let lastChunk: typeof rows = []

        rows.forEach(row => {
            const name = row.cells[nesting]?.value as string
            if (name !== lastName) {
                if (lastChunk.length > 0) {
                    chunks.push(lastChunk)
                }
                lastChunk = [row]
            } else {
                lastChunk.push(row)
            }
            lastName = name
        })
        if (lastChunk.length > 0) {
            chunks.push(lastChunk)
        }
    }
    else {
        chunks = []
    }

    // Передача свойства collapsed дочерним чанкам
    const collapseChunks = () => collapsedChunks = chunks.map(() => true)
    const expandChunks = () => collapsedChunks = chunks.map(() => false)
    $: collapsed ? collapseChunks() : expandChunks()

</script>

{#if chunks?.length > 0}
    {#each chunks as chunk, chunkIndex}

        <!-- CHUNK HEAD -->
        {#if chunk.length > 1}
            <tr class:collapsed>
                {#each Array(nesting) as _}
                    <td/>
                {/each}
                <td>
                    <slot name="cell"
                          columnIndex={nesting}
                          value={chunk[0][nesting]}
                          type={types[nesting]}/>
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
                data={chunk}
                {types}
                {chunking}
                collapsed={!!collapsedChunks[chunkIndex]}
                nesting={nesting + 1}
                bind:checkedRows>
            <svelte:fragment slot="cell" let:columnIndex let:row let:value let:type>
                <slot name="cell" {columnIndex} {row} {value} {type}/>
            </svelte:fragment>
        </svelte:self>

        <!-- CHUNK TOTAL -->
        {#if chunking === "totals" || chunking === "full" || chunking === "collapsable"}
            <TotalRow {chunk}
                      {types}
                      collapsed={collapsed || chunking === "collapsable" && !collapsedChunks[chunkIndex]}
                      {nesting}>
                <svelte:fragment slot="cell" let:columnIndex let:row let:value let:type>
                    <slot name="cell" {columnIndex} {row} {value} {type}/>
                </svelte:fragment>
            </TotalRow>
        {/if}
    {/each}
{:else}
    {#each rows as row}
        <tr class:collapsed>
            <!--{#if hasCheckboxes}-->
            <!--    <td>-->
            <!--        <Switch type="checkbox"-->
            <!--                bind:value={checkedRows[rowIndex]}/>-->
            <!--    </td>-->
            <!--{/if}-->
            {#each row.cells as cell, columnIndex}
                <td>
                    {#if columnIndex >= nesting || columnIndex === nesting - 1 && rows.length === 1}
                        <slot name="cell" {columnIndex} {row} value={cell.value}
                              type={types[columnIndex]}/>
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