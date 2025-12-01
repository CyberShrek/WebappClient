<script lang="ts">

    import Chunks from "./body/BodyChunks.svelte"
    import TotalRow from "./TotalRow.svelte"
    import Headers from "./head/Headers.svelte"
    import Operations from "./head/Operations.svelte"

    export let
        head: string[],
        data: (string | number | boolean | null)[][],
        chunking: ChunkingType = "none",
        addOperations = false,
        addTotal = false

    let bodyElement: HTMLTableSectionElement,
        operations: ColumnOperation[],
        types: ColumnType[] = [],
        preparedData = data


    // Определение типов столбцов
    $: if (data?.length > 0) determineTypes()
    function determineTypes() {
        types = head.map(() => "string")
        data.forEach(row => {
            row.forEach((cell, cellI) => {
                if (cell != null && typeof cell === "number")
                    types[cellI] = "number"
                else if (cell != null && typeof cell === "boolean")
                    types[cellI] = "boolean"
            })
        })
    }

    // Группировка заголовков чанков по rowspan
    $: if (chunking !== "none" && bodyElement) respan()
    function respan() {
        for (let nesting = 0; types[nesting + 1] === "string"; nesting++) {
            let chunkHead: HTMLTableCellElement | null = null
            for (let row of bodyElement.rows) {
                const cell = row.cells.item(nesting)
                if (cell == null)
                    continue

                if (cell.textContent?.trim() !== '') {
                    chunkHead = cell
                    chunkHead.style.display = ''
                    chunkHead.rowSpan = 1
                }
                else if (chunkHead != null) {
                    chunkHead.rowSpan++
                    cell.style.display = "none"
                    cell.rowSpan = 1
                }
            }
        }
    }

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

<table>

    <thead>
        <Headers {head}/>
        {#if addOperations}
            <Operations {types}
                        bind:operations/>
        {/if}
    </thead>

    <tfoot>
        {#if addTotal}
            <TotalRow
                data={preparedData}
                {types}>
                <svelte:fragment slot="cell" let:columnIndex let:row let:value let:type>
                    {#if $$slots.cell}
                        <slot name="cell"
                              {columnIndex}
                              {row}
                              {value}
                              {type}/>
                    {:else}
                        {value}
                    {/if}
                </svelte:fragment>
            </TotalRow>
        {/if}
    </tfoot>

    <tbody bind:this={bodyElement}>
        <Chunks
            data={preparedData}
            {types}
            {chunking}>
            <svelte:fragment slot="cell" let:columnIndex let:row let:value let:type>
                {#if $$slots.cell}
                    <slot name="cell"
                          {columnIndex}
                          {row}
                          {value}
                          {type}/>
                {:else}
                    {value}
                {/if}
            </svelte:fragment>
        </Chunks>
    </tbody>
</table>

<style>
    table {
        border-spacing: 0;
        overflow-x: scroll;
        background: white;
        padding-bottom: var(--indent);
    }

    table thead {
        position: sticky;
        top: var(--report-header-height);
    }
</style>