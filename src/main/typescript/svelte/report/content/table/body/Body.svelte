<script lang="ts">

    import {ColumnType} from "../../table_new/types"

    export let
        body: (string | number | boolean | null)[][],
        types: ColumnType[]

</script>

<tbody>

{#each body as row}
    <tr>
        {#each row as cell, i}
            <td class={types[i]}>{cell != null ? cell : ""}</td>
        {/each}
    </tr>
{/each}

</tbody>