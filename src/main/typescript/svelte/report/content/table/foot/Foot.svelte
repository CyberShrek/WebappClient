<script lang="ts">

    import {ColumnType} from "../../table_new/types";

    export let
        foot: (string | number | boolean | null)[],
        types: ColumnType[]

</script>

<tfoot>
{#if foot?.length > 0}
    <tr class="total">
        {#each foot as cell, cellI}
            <td class={"total " + types[cellI]}>
                {cell != null ? cell : ""}
            </td>
        {/each}
    </tr>
{/if}
</tfoot>
