<script lang="ts">

    import {Table} from "../Table"

    export let
        table: Table

</script>

<thead>
    <!--{#if hasCheckboxes}-->
    <!--    <th rowspan={0}>-->
    <!--        <SuperCheckbox checkedArray={[]}/>-->
    <!--    </th>-->
    <!--{/if}-->
    {#each table.head.content as row, i}
        <tr>
            {#each row as cell}
                <th rowspan={cell.rowspan}
                    colspan={cell.colspan}>
                    {cell.name}
                </th>
            {/each}
        </tr>
    {/each}
    <!--{#if addOperations}-->
    <!--    <Operations {types}-->
    <!--                {data}-->
    <!--                bind:preparedData/>-->
    <!--{/if}-->
</thead>
