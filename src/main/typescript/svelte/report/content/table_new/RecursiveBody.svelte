<script lang="ts">

    import Decimal from "decimal.js-light";

    export let
        data: (string | number | boolean | null)[][],
        types: ("string" | "number" | "boolean")[],
        nesting: number = 0,
        chunksCount: number = 0

    let dataChunks: typeof data[] | null,
        chunksCounter: number[] = []

    $: chunksCount = dataChunks ? chunksCounter.reduce((a, b) => a + b, 1) : 1

    // Дробление данных по первому столбцу, если это строка
    $: if (data?.length > 0 && types?.[nesting] === "string") {
        dataChunks = []
        let lastName: string
        let lastChunk: typeof data
        data.forEach(row => {
            const name = row[nesting] as string
            if (name !== lastName) {
                if (lastChunk) dataChunks?.push(lastChunk)
                lastChunk = [row]
            } else {
                lastChunk.push(row)
            }
            lastName = name
        })
    }
    else dataChunks = null

    $: if (nesting === 0 && dataChunks) {
        console.log(
            "data: ", data,
            "dataChunks: ", dataChunks
        )
    }

    function getChunkTotal(rows: typeof data): typeof data[number] {
        const result: typeof data[number] = types.map((type, index) => {
            switch (type) {
                case "string" : return index === nesting ? rows[0][index] : ""
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


<!--<tr>-->
<!--{chunksCount}-->
<!--</tr>-->
{#if dataChunks}
    {#each dataChunks ?? [] as chunk, chunkIndex}
        <tr>
            {#each getChunkTotal(chunk) as value, columnIndex}
                {#if columnIndex >= nesting}
                    <td rowspan={columnIndex === nesting ? chunk.length + chunksCounter[chunkIndex] : 1}>
<!--                    <td>-->
                        {#if $$slots.cell}
                            <slot name="cell"
                                  {columnIndex}
                                  row={getChunkTotal(chunk)}
                                  {value}
                                  type={types[nesting]}/>
                        {:else}
                            {value}
                        {/if}
                    </td>
                {/if}
            {/each}
        </tr>
        <svelte:self
            data={chunk}
            {types}
            nesting={nesting + 1}
            bind:chunksCount={chunksCounter[chunkIndex]}>
            <svelte:fragment slot="cell" let:columnIndex let:row let:value let:type>
                <slot name="cell" {columnIndex} {row} {value} {type}/>
            </svelte:fragment>
        </svelte:self>
    {/each}
{:else}
    {#each data as row, rowIndex}
        <tr>
            {#each row as value, columnIndex}
                {#if (columnIndex >= nesting)}
                    <td>
                        {#if $$slots.cell}
                            <slot name="cell"
                                  {columnIndex}
                                  {row}
                                  {value}
                                  type={types[columnIndex]}/>
                        {:else}
                            {value}
                        {/if}
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