<script lang="ts">

    import TotalRow from "../TotalRow.svelte"
    import Button from "../../../../input/Button.svelte"

    export let
        data: (string | number | boolean | null)[][],
        types: ("string" | "number" | "boolean")[],
        chunking: ChunkingType = "none",

        collapsed: boolean = false,
        nesting: number = 0

    let dataChunks: typeof data[] = [],
        collapsedChunks: boolean[] = [],
        chunksWithTotals: boolean[] = []

    $: addTotals = chunking === "totals" || chunking === "full"
    $: addCollapsing = chunking === "collapsable" || chunking === "full"

    // Дробление данных и предварительный расчет итогов
    $: if (chunking !== "none" && data?.length > 0 && types?.[nesting + 1] === "string") {
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

    // Передача свойства collapsed дочерним чанкам
    const collapseChunks = () => collapsedChunks = dataChunks.map(() => true)
    const expandChunks = () => collapsedChunks = dataChunks.map(() => false)
    $: collapsed ? collapseChunks() : expandChunks()


</script>

{#if dataChunks?.length > 0}
    {#each dataChunks as chunk, chunkIndex}

        <!-- CHUNK HEAD -->
        {#if chunk.length > 1}
            <tr class:collapsed>
                <!--{#if chunkIndex !== 0}-->
                {#each Array(nesting) as _}
                    <td/>
                {/each}
                <!--{/if}-->
                <td>
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
        {/if}

        <!-- CHUNK BODY -->
        <svelte:self
                data={chunk}
                {types}
                {chunking}
                collapsed={!!collapsedChunks[chunkIndex]}
                nesting={nesting + 1}>
            <svelte:fragment slot="cell" let:columnIndex let:row let:value let:type>
                <slot name="cell" {columnIndex} {row} {value} {type}/>
            </svelte:fragment>
        </svelte:self>

        <!-- CHUNK TOTAL -->
        {#if chunking === "totals" || chunking === "full" || chunking === "collapsable"}
            <TotalRow data={chunk}
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
    {#each data as row }
        <tr class:collapsed>
            {#each row as value, columnIndex}
                <td>
                    {#if columnIndex >= nesting || columnIndex === nesting - 1 && data.length === 1}
                        <slot name="cell" {columnIndex} {row} {value}
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