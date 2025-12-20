<script lang="ts">

    import Sort from "../../../../input/Sort.svelte"
    import {equal} from "../../../../../util/data";
    import {deepCopyOf} from "../../../../../util/data.js";

    export let columns: TableColumn[],
        operations: ColumnOperation[] = []

    let columnsBeforeUpdate: TableColumn[] = []
    $: if (!equal(columns, columnsBeforeUpdate)) update()
    function update() {
        operations = columns.map(() => ({filter: "", sort: null}))
        columnsBeforeUpdate = deepCopyOf(columns)
    }

</script>

<tr class="operations sort">
    {#each operations as operation, colI}
        {#if !!columns[colI].type}
            <th>
                <div class="sort">
                    <Sort bind:value={operation.sort}/>
                </div>
            </th>
        {/if}
    {/each}
</tr>

<tr class="operations filter">
    {#each operations as operation, colI}
        {#if !!columns[colI].type}
            <th>
                {#if columns[colI].type === "string"}
                    <input class="filter"
                           type="text"
                           placeholder="⌕ Фильтр"
                           bind:value={operation.filter}/>
                {/if}
            </th>
        {/if}
    {/each}
</tr>

<style>
    th {
        position: relative;
        padding: 0;
        height: 0;
        border: 0;
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
        top: 0;
        width: 112px;
        cursor: text;
        border: var(--light-border);
        background: transparent;
    }
    input.filter:is(:focus, :hover) {
        background: white;
    }
</style>