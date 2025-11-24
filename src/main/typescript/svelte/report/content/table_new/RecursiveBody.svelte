<script lang="ts">

    export let
        data: (string | number | boolean | null)[][],
        types: ("string" | "number" | "boolean")[],
        nesting: number = 0

    let dataChunks: typeof data[] | null

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
    else dataChunks = [data]

    $: if (nesting === 0 && dataChunks) {
        console.log(
            "data: ", data,
            "dataChunks: ", dataChunks
        )
    }

</script>

{#each dataChunks ?? [] as chunk}
    <tr>
        {#each chunk[0] as value, columnIndex}
            {#if columnIndex === nesting}
                <td rowspan={chunk.length}>
                    {#if $$slots.cell}
                        <slot name="cell"
                              {columnIndex}
                              row={chunk[0]}
                              {value}
                              type={types[nesting]}/>
                    {:else}
                        {chunk[0][nesting]}
                    {/if}
                    : {chunk.length}
                </td>
            {:else if (columnIndex >= nesting)}
                <td>
                    {nesting}
                </td>
            {/if}
        {/each}
    </tr>
    <svelte:self
        data={chunk}
        {types}
        nesting={nesting + 1}>
        <svelte:fragment slot="cell" let:columnIndex let:row let:value let:type>
            <slot name="cell" {columnIndex} {row} {value} {type}/>
        </svelte:fragment>
    </svelte:self>
{/each}

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
