<script lang="ts">

    import Chunk from "./body/Chunk.svelte"
    import TotalRow from "./TotalRow.svelte"
    import {Table} from "./Table"
    import TableHead from "./head/TableHead.svelte"

    export let
        matrix: Matrix,
        config: TableConfig = {}

    let element: HTMLTableElement,
        table: Table

    $: if (matrix && config && element)
        table = new Table(matrix, config, element)

    // Группировка заголовков чанков по rowspan

</script>

<table bind:this={element}>

    <TableHead {table}/>

<!--    <tfoot>-->
<!--        {#if config.addTotal}-->
<!--            &lt;!&ndash;{#if hasCheckboxes}&ndash;&gt;-->
<!--            &lt;!&ndash;    <td rowspan={0}/>&ndash;&gt;-->
<!--            &lt;!&ndash;{/if}&ndash;&gt;-->
<!--            <TotalRow-->
<!--                rows={preparedData}-->
<!--                {types}>-->
<!--                <svelte:fragment slot="cell" let:columnIndex let:row let:value let:type>-->
<!--                    {#if $$slots.cell}-->
<!--                        <slot name="cell"-->
<!--                              {columnIndex}-->
<!--                              {row}-->
<!--                              {value}-->
<!--                              {type}/>-->
<!--                    {:else}-->
<!--                        {value}-->
<!--                    {/if}-->
<!--                </svelte:fragment>-->
<!--            </TotalRow>-->
<!--        {/if}-->
<!--    </tfoot>-->

    <tbody>
        <Chunk
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
        </Chunk>
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