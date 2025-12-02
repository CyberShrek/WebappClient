<script lang="ts">

    import Sort from "../../../../input/Sort.svelte"
    import Text from "../../../../input/Text.svelte"

    export let
        types: ColumnType[],
        data: (string | number | boolean | null)[][],
        preparedData: typeof data

    let operations: ColumnOperation[] = types.map(() => ({filter: "", sort: null}))

    // Фильтрация и сортировка
    $: if (data && operations) processOperations()
    function processOperations() {

        // Фильтрация
        preparedData = data.filter(row =>
            operations.every((oper, i) =>
                !oper.filter || String(row[i]).toLowerCase().includes(oper.filter.toLowerCase()))
        )

        // Сравнение значений для сортировки
        const compareValues = (a: any, b: any, type: ColumnType) =>
            type === 'number' ? Number(a) - Number(b) :
                type === 'string' ? String(a).localeCompare(String(b)) :
                    (a === b ? 0 : a ? 1 : -1)

        // Сортировка
        preparedData.sort((a, b) =>
            operations.reduce((diff, oper, i) => diff || !oper.sort ? diff :
                oper.sort === 'asc' ? compareValues(a[i], b[i], types[i]) :
                    -compareValues(a[i], b[i], types[i]), 0)
        )
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
            {#if types[colI] === "string"}
                <Text bind:value={operation.filter}
                      placeholder="⌕ Поиск"/>
            {/if}
        </th>
    {/each}
</tr>