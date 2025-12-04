<script lang="ts">

    import Sort from "../../../../input/Sort.svelte"
    import Text from "../../../../input/Text.svelte"

    export let table: Table

    let operations: ColumnOperation[] = table.types.map(() => ({filter: "", sort: null}))

    $: operations && processOperations()

    function processOperations() {
        table.processOperations(operations)
        table.body = table.body
    }

</script>

<tr class="operations sort">
    {#each operations as operation}
        <th>
            <Sort bind:value={operation.sort}/>
        </th>
    {/each}
</tr>

<tr class="operations filter">
    {#each operations as operation, colI}
        <th>
            {#if table.types[colI] === "string"}
                <Text bind:value={operation.filter}
                      placeholder="⌕ Поиск"/>
            {/if}
        </th>
    {/each}
</tr>