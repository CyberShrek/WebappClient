<script lang="ts">

    import TotalRow from "../body/TotalRow.svelte"

    export let
        totalRow: TableRow | null = null,
        hasSlot = false

</script>

<tfoot>
    {#if hasSlot}
        <tr>
            <td colspan=1000
                class="slot">
                <slot name="foot"/>
            </td>
        </tr>
    {/if}
    {#if totalRow}
        <TotalRow {totalRow}>
            <svelte:fragment slot="cell" let:cell>
                <slot name="cell" {cell}/>
            </svelte:fragment>
        </TotalRow>
    {/if}
</tfoot>

<style>
    tfoot {
        position: sticky;
        bottom: 0;
        z-index: 1;
    }

    .slot {
        position: absolute;
        border:none;
        bottom: var(--strong-indent);
        left: var(--strong-indent);
        transform: translateY(-100%);
    }
    .slot  :global(*) {
        filter: drop-shadow(var(--drop-shadow));
    }
</style>