<script lang="ts">

    import HeadCheckbox from "./HeadCheckbox.svelte"
    import Operations from "./Operations.svelte"
    import PagesBar from "./PagesBar.svelte";

    export let
        head: TableHead,
        pageIndex: number

    $: pagesLength = head.table.pages.length

</script>

<thead>
    {#if head.table.config.addCheckboxes}
        <th rowspan={0}>
            <HeadCheckbox bind:dependent={head.table.pages}/>
        </th>

    {/if}
    {#if pagesLength > 1}
        <PagesBar {pagesLength}
                  bind:pageIndex/>
    {/if}
    {#each head.content as row}
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
