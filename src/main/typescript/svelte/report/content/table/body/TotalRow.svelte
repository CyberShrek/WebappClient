<script lang="ts">

    export let
        totalRow: TableRow | null,
        collapsed: boolean = false,
        totalWord = "Итого",
        checkboxSpan: boolean = true

</script>

<tr class:collapsed>
    {#if totalRow}
        {#if totalRow.chunk.table.config.addCheckboxes && checkboxSpan}
            <td class="checkbox"/>
        {/if}
        {#each totalRow.cells as cell, columnIndex}
            {#if !cell.hidden}
                <td class={totalRow.chunk.table.types[columnIndex]}>
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

<style>
    td:not(.checkbox){
        background: var(--secondary-color);
        font-weight: bold;
        border-top: var(--light-border);
    }
</style>