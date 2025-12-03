<script lang="ts">

    import TotalRow from "../body/TotalRow.svelte";

    export let
        totalRow: TableRow | null = null

</script>

<tfoot>
    {#if totalRow}
        <TotalRow {totalRow}>
            <svelte:fragment slot="cell" let:cell>
                <slot name="cell" {cell}/>
            </svelte:fragment>
        </TotalRow>
    {/if}
</tfoot>