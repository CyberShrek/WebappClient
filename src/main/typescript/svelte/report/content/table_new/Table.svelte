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

    let element: HTMLTableElement,
        table: ConcreteTable

    $: if (matrix && config && element) rebuildTable()
    function rebuildTable() {
        table = new ConcreteTable(matrix, config, element)
    }

    $: selectedRows = config.addCheckboxes ? table?.body.rows.filter(row => row.checked) : null
    $: selectedRows && dispatch(SELECT_EVENT, selectedRows.map(row => row.cells.map(cell => cell.value)))

</script>

<table bind:this={element}>
    {#if table}
        <TableHead bind:head={table.head}/>

        <TableFoot totalRow={config.addTotal ? table.body.totalRow : null}>
            <svelte:fragment slot="cell" let:cell>
                <slot name="cell" {cell}/>
            </svelte:fragment>
        </TableFoot>

        <TableBody bind:body={table.body}>
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