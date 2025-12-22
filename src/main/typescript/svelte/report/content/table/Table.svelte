<script lang="ts">

    import TableHead from "./head/TableHead.svelte"
    import TableBody from "./body/TableBody.svelte"
    import {ConcreteTable} from "./Table"
    import TableFoot from "./foot/TableFoot.svelte"
    import {createEventDispatcher} from "svelte"
    import {TableExport} from "../../../../model/export/TableExport"

    const dispatch = createEventDispatcher(),
        SELECT_EVENT = "select"

    export let
        title: string = "",
        matrix: Matrix,
        config: TableConfig = {},
        table:  Table | undefined = undefined

    export const exportCallback: () => ExportableReport = () => new TableExport(title, table as Table)

    $: if (matrix && config) rebuildTable()
    function rebuildTable() {
        table = new ConcreteTable(matrix, config)
    }

    let pageIndex: number

    $: table && config.addCheckboxes && dispatchSelection()

    function dispatchSelection() {
        const
            selection: TableRow[] = [],
            collectSelection = (chunk: TableBodyChunk) => chunk.content.forEach(content => {
                switch (content.type) {
                    case "row": content.checked && selection.push(content); break
                    case "chunk": collectSelection(content); break
                }
            })
        table?.pages.forEach(collectSelection)

        dispatch(SELECT_EVENT, selection)
    }

    let operations: ColumnOperation[]
    $: if (!!operations) processOperations()
    function processOperations() {
        if (!table) return
        (table as ConcreteTable).processOperations(operations)
        table = table
    }

</script>

<table>
    {#if table}
        <TableHead {table}
                   bind:pageIndex
                   bind:operations/>

        <TableFoot totalRow={config.addTotal ? table.total : null}
                   hasSlot={!!$$slots.foot}>
            <svelte:fragment slot="cell" let:cell>
                <slot name="cell" {cell}/>
            </svelte:fragment>
            <slot name="foot" slot="foot"/>

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
        width: 100%;
    }

    :global(table :is(td, th)) {
        border-right: var(--light-border);
        border-bottom: var(--light-border);
        height: 24px;
        padding: 4px 8px;
    }
    :global(table td) {
        vertical-align: top;
    }
    :global(table td:not(.primary):last-child) {
        border-right: none;
    }
    :global(table td.number) {
        text-align: end;
        font-family: Roboto Mono, serif;
    }
    :global(table td.boolean) {
        text-align: center;
    }
    :global(table :is(th, td).checkbox) {
        width: 0;
    }
    :global(table :is(.collapsed, .collapsed *)) {
        opacity: 0   !important;
        height: 0    !important;
        font-size: 0 !important;
        padding: 0   !important;
        border: none !important;
    }
</style>