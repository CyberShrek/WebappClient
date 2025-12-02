<script lang="ts">

    import Chunks from "./body/BodyChunks.svelte"
    import TotalRow from "./TotalRow.svelte"
    import Headers from "./head/Headers.svelte"
    import Operations from "./head/Operations.svelte"
    import {tick} from "svelte"
    import SuperCheckbox from "../../../input/SuperCheckbox.svelte"

    export let
        head: string[],
        data: (string | number | boolean | null)[][],
        chunking: ChunkingType = "none",
        addOperations = false,
        addTotal = false,
        checkedData: typeof data | null = null

    let bodyElement: HTMLTableSectionElement,
        types: ColumnType[] = [],
        preparedData = data,
        checkedRows: number[] | null = null

    $: hasCheckboxes = checkedData != null
    $: checked = hasCheckboxes ? false : null

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
                const cell = row.cells.item(nesting + (hasCheckboxes ? 1 : 0))
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

</script>

<table>

    <thead>
        {#if hasCheckboxes}
            <th rowspan={0}>
                <SuperCheckbox checkedArray={[]}/>
            </th>
        {/if}
        <Headers {head}/>
        {#if addOperations}
            <Operations {types}
                        {data}
                        bind:preparedData/>
        {/if}
    </thead>

    <tfoot>
        {#if addTotal}
            {#if hasCheckboxes}
                <td rowspan={0}/>
            {/if}
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