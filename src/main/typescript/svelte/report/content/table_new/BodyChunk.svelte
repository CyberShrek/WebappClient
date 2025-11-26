<script lang="ts">
    import Decimal from "decimal.js-light";
    import TotalRow from "./TotalRow.svelte";

    export let
        data: (string | number | boolean | null)[][],
        types: ("string" | "number" | "boolean")[],
        nesting: number = 0,
        chunksCount: number = 1,

        addTotals = false


    let dataChunks: typeof data[] = [],
        chunksCounter: number[] = [],
        chunkTotals: typeof data[number][] = []

    $: chunksCount = dataChunks ? chunksCounter.reduce((a, b) => a + b + Number(addTotals), 1) : 1

    // Дробление данных и предварительный расчет тоталов
    $: if (data?.length > 0 && types?.[nesting] === "string") {
        dataChunks = []
        chunkTotals = []
        let lastName: string
        let lastChunk: typeof data = []

        data.forEach(row => {
            const name = row[nesting] as string
            if (name !== lastName) {
                if (lastChunk.length > 0) {
                    dataChunks.push(lastChunk)
                    chunkTotals.push(calculateChunkTotal(lastChunk))
                }
                lastChunk = [row]
            } else {
                lastChunk.push(row)
            }
            lastName = name
        })
        if (lastChunk.length > 0) {
            dataChunks.push(lastChunk)
            chunkTotals.push(calculateChunkTotal(lastChunk))
        }
    }
    else {
        dataChunks = []
        chunkTotals = []
    }

    function calculateChunkTotal(rows: typeof data): typeof data[number] {
        const result: typeof data[number] = types.map((type, index) => {
            switch (type) {
                case "string" : return index === nesting ? rows[0][index] : "Итого"
                case "number" : return 0
                case "boolean": return ""
            }
        })
        rows.forEach(row => {
            row.forEach((cell, index) => {
                    if (index > nesting && types[index] === "number") {
                        const sum = new Decimal(result[index] as number)
                        result[index] = sum.add(Number(cell)).toNumber()
                    }
                }
            )
        })

        return result
    }

</script>

{#if dataChunks?.length > 0}
    {#each dataChunks as chunk, chunkIndex}

        <!-- PRIMARY CELL -->
        <tr>
            <td rowspan={chunk.length + chunksCounter[chunkIndex] + (addTotals ? 1 : 0)}>
                <slot name="cell"
                      columnIndex={nesting}
                      value={chunk[0][nesting]}
                      type={types[nesting]}/>
            </td>
        </tr>

        <!-- BODY -->
        <svelte:self
                data={chunk}
                {types}
                {addTotals}
                nesting={nesting + 1}
                bind:chunksCount={chunksCounter[chunkIndex]}>
            <svelte:fragment slot="cell" let:columnIndex let:row let:value let:type>
                <slot name="cell" {columnIndex} {row} {value} {type}/>
            </svelte:fragment>
        </svelte:self>

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
{:else}
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