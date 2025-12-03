<script lang="ts">

    import Decimal from "decimal.js-light"

    export let
        totalRow: TableRow,
        collapsed: boolean = false,
        totalWord = "Итого"

</script>

<tr class:collapsed>
    {#each totalRow.cells as cell, columnIndex}
        <td>
            {#if columnIndex === totalRow.chunk.nesting}
                {totalWord}
            {:else if columnIndex > totalRow.chunk.nesting && cell.type === "number"}
                <slot name="cell" {cell}/>
            {/if}
        </td>
    {/each}
</tr>