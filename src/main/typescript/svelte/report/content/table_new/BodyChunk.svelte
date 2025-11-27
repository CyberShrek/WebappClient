<script lang="ts">
    import Decimal from "decimal.js-light";
    import TotalRow from "./TotalRow.svelte";
    import Button from "../../../input/Button.svelte";

    export let
        data: (string | number | boolean | null)[][],
        types: ("string" | "number" | "boolean")[],
        chunking: "none" | "simple" | "totals" | "collapsable" | "full" = "none",

        collapsed: boolean = false,
        nesting: number = 0,
        chunksCount: number = 1

    let dataChunks: typeof data[] = [],
        chunksCounter: number[] = [],
        collapsedChunks: boolean[] = []

    $: addTotals = chunking === "totals" || chunking === "full" || chunking === "collapsable" && collapsed
    $: addCollapsing = chunking === "collapsable" || chunking === "full"

    $: chunksCount = dataChunks ? chunksCounter.reduce((a, b) => a + b + Number(addTotals), 1) : 1

    // Дробление данных и предварительный расчет итогов
    $: if (chunking !== "none" && data?.length > 0 && types?.[nesting] === "string") {
        dataChunks = []
        let lastName: string
        let lastChunk: typeof data = []

        data.forEach(row => {
            const name = row[nesting] as string
            if (name !== lastName) {
                if (lastChunk.length > 0) {
                    dataChunks.push(lastChunk)
                }
                lastChunk = [row]
            } else {
                lastChunk.push(row)
            }
            lastName = name
        })
        if (lastChunk.length > 0) {
            dataChunks.push(lastChunk)
        }

    }
    else {
        dataChunks = []
    }

</script>

{#if dataChunks?.length > 0}
    {#each dataChunks as chunk, chunkIndex}

        {#if !collapsed}
            <!-- PRIMARY CELL -->
            <tr>
                <td rowspan={chunk.length + chunksCounter[chunkIndex] + (addTotals ? 1 : 0)}>
                    <slot name="cell"
                          columnIndex={nesting}
                          value={chunk[0][nesting]}
                          type={types[nesting]}/>
                    {#if addCollapsing}
                        <Button text={collapsedChunks[chunkIndex] ? '▼' : '▲'}
                                hint={collapsedChunks[chunkIndex] ? 'Развернуть' : 'Свернуть'}
                                on:click={() => collapsedChunks[chunkIndex] = !collapsedChunks[chunkIndex]}
                                design="frameless"
                                size="small"/>
                    {/if}
                </td>
            </tr>
            <!-- BODY -->
            <svelte:self
                    data={chunk}
                    {types}
                    {chunking}
                    collapsed={collapsedChunks[chunkIndex]}
                    nesting={nesting + 1}
                    bind:chunksCount={chunksCounter[chunkIndex]}>
                <svelte:fragment slot="cell" let:columnIndex let:row let:value let:type>
                    <slot name="cell" {columnIndex} {row} {value} {type}/>
                </svelte:fragment>
            </svelte:self>
        {/if}

        <!-- TOTAL -->
        {#if addTotals}
            <TotalRow data={chunk}
                      {types}
                      {nesting}>
                <svelte:fragment slot="cell" let:columnIndex let:row let:value let:type>
                    <slot name="cell" {columnIndex} {row} {value} {type}/>
                </svelte:fragment>
            </TotalRow>
        {/if}
    {/each}
{:else if !collapsed}
    {#each data as row}
        <tr>
            {#each row as value, columnIndex}
                {#if (columnIndex >= nesting)}
                    <td>
                        <slot name="cell" {columnIndex} {row} {value}
                              type={types[columnIndex]}/>
                    </td>
                {/if}
            {/each}
        </tr>
    {/each}
{/if}

<style>
    td {
        border: var(--light-border);
    }
</style>