<script lang="ts">

    export let
        head: string[],
        data: (string | number | boolean | null)[][]

    let operations: {
            filter: string
            sort:   "asc" | "desc"
        }[],
        types: ("string" | "number" | "boolean")[] = []

    $: if (data?.length > 0) determineTypes()

    function determineTypes() {
        types = head.map(() => "string")
        data.forEach(row => {
            row.forEach((cell, cellI) => {
                if (cell != null && typeof cell === "number")
                    types[cellI] = "number"
                else if (cell != null && typeof cell === "boolean")
                    types[cellI] = "boolean"
            })
        })
    }

</script>

<table>
    <thead>
        <tr>
            {#each head as cell}
                <th>{cell}</th>
            {/each}
        </tr>
    </thead>

    <tbody>
        {#each data as row}
            <tr>
                {#each head as column, columnIndex}
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
                {/each}
            </tr>
        {/each}
    </tbody>
</table>
<style>
    table {
        border-spacing: 0;
        overflow-x: scroll;
        background: white;
        padding-bottom: var(--indent);
    }

    table thead {
        position: sticky;
        top: var(--report-header-height);
    }
</style>
