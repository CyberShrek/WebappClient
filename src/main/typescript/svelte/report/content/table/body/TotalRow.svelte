<script lang="ts">

    export let
        totalRow: TableRow | null,
        collapsed: boolean = false,
        checkboxSpan: boolean = true

</script>

<tr class:collapsed>
    {#if totalRow}
        {#if totalRow.chunk.table.config.addCheckboxes && checkboxSpan}
            <td class="checkbox"/>
        {/if}
        {#each Object.values(totalRow.cells) as cell}
            {#if !cell.hidden}
                <td class={cell.column.type}>
                    {#if cell.column.type === "number"}
                        <slot name="cell" {cell}/>
                    {:else}
                        {cell.value}
                    {/if}
                </td>
            {/if}
        {/each}
    {/if}
</tr>

<style>
    td{
        background: var(--secondary-color);
        font-weight: bold;
        border-top: var(--light-border);
    }
    td.checkbox{
        background: white;
    }
</style>