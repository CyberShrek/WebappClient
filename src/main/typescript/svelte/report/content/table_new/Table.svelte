<script lang="ts">

    import TableHead from "./head/TableHead.svelte"
    import TableBody from "./body/TableBody.svelte";
    import {ConcreteTable} from "./Table";
    import TableFoot from "./foot/TableFoot.svelte";
    import {tick} from "svelte";

    export let
        matrix: Matrix,
        config: TableConfig = {}

    let element: HTMLTableElement,
        table: ConcreteTable

    $: if (matrix && config && element) {
        table = new ConcreteTable(matrix, config, element)
    }

</script>

<table bind:this={element}>
    {#if table}
        <TableHead head={table.head}/>

        <TableFoot totalRow={config.addTotal ? table.body.totalRow : null}>
            <svelte:fragment slot="cell" let:cell>
                <slot name="cell" {cell}/>
            </svelte:fragment>
        </TableFoot>

        <TableBody body={table.body}>
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