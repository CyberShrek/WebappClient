<script lang="ts">

    import HeadCheckbox from "./HeadCheckbox.svelte"
    import Operations from "./Operations.svelte"
    import PagesBar from "./PagesBar.svelte";

    export let
        table: Table,
        pageIndex: number,
        operations: ColumnOperation[]

    $: pageLengthArray = table.pages.map(page => page.length)

</script>

<thead>
    {#if pageLengthArray.length > 1}
        <PagesBar {pageLengthArray}
                  bind:pageIndex/>
    {/if}
    {#if table.config.addCheckboxes}
        <th rowspan={0} class="checkbox">
            <HeadCheckbox bind:dependent={table.pages}/>
        </th>
    {/if}
    {#each table.head as row}
        <tr>
            {#each row as cell}
                {#if !!cell}
                    <th rowspan={cell.rowspan}
                        colspan={cell.colspan}>
                        {cell.value}
                    </th>
                {/if}
            {/each}
        </tr>
    {/each}
    {#if table.config.addOperations}
        <Operations columns={table.columns}
                    bind:operations/>
    {/if}
</thead>

<style>
    thead {
        position: sticky;
        top: var(--report-header-height);
        z-index: 2;
    }

    :global(.report.fullscreen) thead {
        top: var(--report-header-full-height);
    }
    :global(.modal) thead {
        top: 0;
    }

    th {
        color: white;
        font-weight: normal;
        background: var(--accent-color);
    }
    th:not(.checkbox) {
        /*min-width: 100px;*/
    }
    tr:last-child th:not(.checkbox) {
        /*padding-left: 18px !important;*/
        padding-right: 38px !important;
    }
</style>
