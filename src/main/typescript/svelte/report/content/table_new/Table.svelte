<script lang="ts">

    import TableHead from "./head/TableHead.svelte"
    import TableBody from "./body/TableBody.svelte"
    import {ConcreteTable} from "./Table"
    import TableFoot from "./foot/TableFoot.svelte"
    import {createEventDispatcher} from "svelte"

    const dispatch = createEventDispatcher(),
        SELECT_EVENT = "select"

    export let
        matrix: Matrix,
        config: TableConfig = {}

    let table: ConcreteTable

    $: if (matrix && config) rebuildTable()
    function rebuildTable() {
        table = new ConcreteTable(matrix, config)
    }

    let pageIndex: number

    $: table && config.addCheckboxes && dispatchSelection()

    function dispatchSelection() {
        const
            selection: MatrixData = [],
            collectSelection = (chunk: TableBodyChunk) => chunk.content.forEach(content => {
                switch (content.type) {
                    case "row": content.checked && selection.push(content.cells.map(cell => cell.value)); break
                    case "chunk": collectSelection(content); break
                }
            })
        table.pages.forEach(collectSelection)

        dispatch(SELECT_EVENT, selection)
    }

</script>

<table>
    {#if table}
        <TableHead bind:head={table.head}
                   bind:pageIndex/>

        <TableFoot totalRow={config.addTotal ? table.total : null}>
            <svelte:fragment slot="cell" let:cell>
                <slot name="cell" {cell}/>
            </svelte:fragment>
        </TableFoot>

        <TableBody bind:pages={table.pages}
                   {pageIndex}>
            <svelte:fragment slot="cell" let:cell>
                <slot name="cell" {cell}/>
            </svelte:fragment>
        </TableBody>
    {/if}
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