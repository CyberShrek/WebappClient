<script lang="ts">

    import TotalRow from "./TotalRow.svelte"
    import Button from "../../../../input/Button.svelte"
    import Switch from "../../../../input/Switch.svelte"
    import HeadCheckbox from "../head/HeadCheckbox.svelte"

    export let
        body: BodyChunk

    $: chunking  = body.table.config.chunking
    $: nesting   = body.nesting
    $: collapsed = body.collapsed

    $: {collapsed; provideCollapsed()}

    function provideCollapsed() {
        body.childChunks.forEach(chunk => chunk.collapsed = collapsed)
    }

</script>

{#if chunking && body.childChunks?.length > 0}
    {#each body.childChunks as chunk, chunkIndex}

        <!-- CHUNK HEAD -->
        {#if chunk.rows.length > 1}
            <tr class:collapsed>
                {#if body.table.config.addCheckboxes}
                    <td>
                        <!--{#if chunk.collapsed}-->
                        <!--    <HeadCheckbox bind:body={chunk}/>-->
                        <!--{/if}-->
                    </td>
                {/if}
                {#each Array(nesting) as _}
                    <td/>
                {/each}
                <td>
                    <slot name="cell"
                          cell={chunk.totalRow.cells[nesting]}/>
                    {#if chunking === "collapsable" || chunking === "full"}
                        <Button text={chunk.collapsed ? '▼' : '▲'}
                                hint={chunk.collapsed ? 'Развернуть' : 'Свернуть'}
                                on:click={() => chunk.collapsed = !chunk.collapsed}
                                design="frameless"
                                size="small"/>
                    {/if}
                </td>
            </tr>
        {/if}

        <!-- CHUNK BODY -->
        <svelte:self
                bind:body={chunk}>
            <svelte:fragment slot="cell" let:cell>
                <slot name="cell" {cell}/>
            </svelte:fragment>
        </svelte:self>

        <!-- CHUNK TOTAL -->
        {#if (chunking === "totals" || chunking === "full" || chunking === "collapsable") && chunk.rows.length > 1}
            <TotalRow totalRow={chunk.totalRow}
                      collapsed={collapsed || !chunk.collapsed && chunking === "collapsable"}>
                <svelte:fragment slot="cell" let:cell>
                    <slot name="cell" {cell}/>
                </svelte:fragment>
            </TotalRow>
        {/if}
    {/each}
{:else}
    {#each body.rows as row}
        <tr class:collapsed>
            {#if body.table.config.addCheckboxes}
                <td>
                    <Switch type="checkbox"
                            bind:checked={row.checked}/>
                </td>
            {/if}
            {#each row.cells as cell, columnIndex}
                <td>
                    {#if columnIndex >= nesting || columnIndex === nesting - 1 && body.rows.length === 1}
                        <slot name="cell" {cell}/>
                    {/if}
                </td>
            {/each}
        </tr>
    {/each}
{/if}

<style>
    td {
        border-right: var(--light-border);
        border-bottom: var(--light-border);
    }

    :global(tr *) {
        transition: 0.2s all;
    }

    :global(tr.collapsed *) {
        opacity: 0   !important;
        height: 0    !important;
        font-size: 0 !important;
        padding: 0   !important;
        border: none !important;
    }
</style>