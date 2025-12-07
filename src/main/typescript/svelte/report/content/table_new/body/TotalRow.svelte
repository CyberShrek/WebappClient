<script lang="ts">

    export let
        totalRow: TableRow | null,
        collapsed: boolean = false,
        totalWord = "Итого"

</script>

<tr class:collapsed>
    {#if totalRow}
        {#if totalRow.chunk.table.config.addCheckboxes}
            <td/>
        {/if}
        {#each totalRow.cells as cell, columnIndex}
            {#if !cell.spanned}
                <td>
                    {#if columnIndex === totalRow.chunk.nesting}
                        {totalWord}
                    {:else if columnIndex > totalRow.chunk.nesting && cell.type === "number"}
                        <slot name="cell" {cell}/>
                    {/if}
                </td>
            {/if}
        {/each}
    {/if}
</tr>