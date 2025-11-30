<script lang="ts">

    import Chunks from "./BodyChunks.svelte"
    import TotalRow from "./TotalRow.svelte"

    export let
        head: string[],
        data: (string | number | boolean | null)[][],
        chunking: "none" | "simple" | "totals" | "collapsable" | "full" = "none",
        addTotals = false

    let bodyElement: HTMLTableSectionElement,
        operations: {
            filter: string
            sort:   "asc" | "desc"
        }[],
        types: ("string" | "number" | "boolean")[] = []

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

</script>

<table>
    <thead>
        <tr>
            {#each head as cell}
                <th>{cell}</th>
            {/each}
        </tr>
    </thead>

    <tfoot>
        {#if addTotals}
            <TotalRow
                {data}
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
            {data}
            {types}
            {chunking}
            {bodyElement}>
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