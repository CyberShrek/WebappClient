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
                <button class="sort {operation.sort ?? ''}"
                        title="Сортировка"
                        on:click={() => operation.sort = operation.sort == null ? "asc" : operation.sort === "asc" ? "desc" : null}>
                    {#if operation.sort === "asc"}
                        ↑
                    {:else if operation.sort === "desc"}
                        ↓
                    {:else}
                        ⇅
                    {/if}
                </button>
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

    button.sort {
        position: absolute;
        right: -8px;
        bottom: -28px;
        cursor: pointer;
        opacity: 0.5;
        height: 18px;
        width: 18px;
        padding: 0;
        transform: translateX(calc(0px - var(--indent))) translateY(calc(-20px - var(--indent)));
        border-radius: 100px;
        border: none;
    }
    button.sort:is(:hover, .asc, .desc) {
        opacity: 1;
    }

    input.filter {
        display: flex;
        position: absolute;
        right: 24px;
        bottom: 4px;
        height: 16px;
        width: calc(100% - 31px);
        cursor: text;
        border: none;
        border-radius: 100px;
        opacity: 0.5;
    }
    input.filter:is(:focus, :hover) {
        opacity: 1;
    }
</style>