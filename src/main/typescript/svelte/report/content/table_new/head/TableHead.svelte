<script lang="ts">

    import HeadCheckbox from "./HeadCheckbox.svelte"
    import Operations from "./Operations.svelte"

    export let
        head: TableHead

</script>

<thead>
    {#if head.table.config.addCheckboxes}
        <th rowspan={0}>
            <HeadCheckbox bind:body={head.table.pages}/>
        </th>

    {/if}
    {#each head.content as row, i}
        <tr>
            {#each row as cell}
                <th rowspan={cell.rowspan}
                    colspan={cell.colspan}>
                    {cell.value}
                </th>
            {/each}
        </tr>
    {/each}
    {#if head.table.config.addOperations}
        <Operations bind:table={head.table}/>
    {/if}
</thead>
