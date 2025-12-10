<script lang="ts">

    import Sort from "../../../../input/Sort.svelte"
    import Text from "../../../../input/Text.svelte"
    import {type} from "node:os";

    export let table: Table

    let operations: ColumnOperation[] = table.types
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
            {#if table.types[colI] === "string"}
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
        right: -5px;
        bottom: -5px;
    }
    input.filter {
        position: absolute;
        right: 0;
        top: -1px;
        width: 150px;
        opacity: 0.5;
        cursor: text;
        border: var(--light-border);
    }
    input.filter:is(:focus, :hover) {
        opacity: 1;
    }
</style>