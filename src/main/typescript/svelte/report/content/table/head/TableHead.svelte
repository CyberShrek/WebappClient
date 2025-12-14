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
    {#if pagesLength > 1}
        <PagesBar {pagesLength}
                  bind:pageIndex/>
    {/if}
    {#if head.table.config.addCheckboxes}
        <th rowspan={0} class="checkbox">
            <HeadCheckbox bind:dependent={head.table.pages}/>
        </th>
    {/if}
    {#each head.content as row}
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
    {#if head.table.config.addOperations}
        <Operations bind:table={head.table}/>
    {/if}
</thead>

<style>
    thead {
        position: sticky;
        top: var(--report-header-height);
        z-index: 100;
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
        padding-left: 20px !important;
        padding-right: 20px !important;
        min-width: 100px;
    }
</style>
