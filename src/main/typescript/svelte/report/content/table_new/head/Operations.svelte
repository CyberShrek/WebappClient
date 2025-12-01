<script lang="ts">

    import Sort from "../../../../input/Sort.svelte"
    import Text from "../../../../input/Text.svelte"

    export let
        types: ColumnType[],
        operations: ColumnOperation[] = types.map(() => ({filter: "", sort: null}))

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
            {#if types[colI] === "string"}
                <Text bind:value={operation.filter}
                      placeholder="⌕ Поиск"/>
            {/if}
        </th>
    {/each}
</tr>