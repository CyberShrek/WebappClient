<script lang="ts">

    import Switch from "../../../../input/Switch.svelte";

    export let
        head: TableHead

</script>

<thead>
    {#if head.table.config.addCheckboxes}
        <th rowspan={0}>
            <Switch type="checkbox"/>
        </th>
    {/if}
    {#each head.content as row, i}
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
