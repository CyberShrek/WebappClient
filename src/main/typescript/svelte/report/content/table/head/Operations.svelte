<script lang="ts">

    import Sort from "../../../../input/Sort.svelte"

    export let table: Table

    let operations: ColumnOperation[] = table.columnTypes
        .filter(type => !!type)
        .map(() => ({filter: "", sort: null}))

    $: operations && processOperations()

    function processOperations() {
        table.processOperations(operations)
        table = table
    }

</script>

<tr class="operations sort">
    {#each operations as operation, colI}
        <th>
            <div class="sort">
                <Sort bind:value={operation.sort}/>
            </div>
        </th>
    {/each}
</tr>

<tr class="operations filter">
    {#each operations as operation, colI}
        <th>
            {#if table.columnTypes[colI] === "string"}
                <input class="filter"
                       type="text"
                       placeholder="⌕ Фильтр"
                       bind:value={operation.filter}/>
            {/if}
        </th>
    {/each}
</tr>

<style>
    th {
        position: relative;
        padding: 0;
        height: 0;
        border: 0;
        /*max-height: 0 !important;*/
        border-top: none;
        background: var(--accent-color);
    }

    div.sort {
        position: absolute;
        right: -6px;
        bottom: -8px;
    }
    input.filter {
        position: absolute;
        right: 0;
        top: -1px;
        width: 112px;
        cursor: text;
        border: var(--light-border);

        background: transparent;
        /*Blur*/
        backdrop-filter: blur(2px)  !important;
        -webkit-backdrop-filter: blur(2px) !important;
    }
    input.filter:is(:focus, :hover) {
        background: white;
    }
</style>