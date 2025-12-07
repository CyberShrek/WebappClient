<script lang="ts">

    import TotalRow from "./TotalRow.svelte"
    import Button from "../../../../input/Button.svelte"
    import Switch from "../../../../input/Switch.svelte"
    import HeadCheckbox from "../head/HeadCheckbox.svelte"

    export let
        body: TableBodyChunk

    $: chunking  = body.table.config.chunking

</script>

{#each body.content as content}
    {#if content.type === "row"}

        <tr class:collapsed={content.collapsed}>
            {#if body.table.config.addCheckboxes}
                {#if !content.collapsed}
                    <td>
                        <Switch type="checkbox"
                                bind:checked={content.checked}/>
                    </td>
                {/if}
            {/if}
            {#each content.cells as cell}
                {#if !cell.spanned}
                    <td>
                        <slot name="cell" {cell}/>
                    </td>
                {/if}
            {/each}
        </tr>

    {:else if content.type === "chunk"}

        <!-- CHUNK HEAD -->
        <tr class:collapsed={body.collapsed}>
            {#if body.table.config.addCheckboxes}
                {#if content.collapsed}
                    <td rowspan={content.rowspan}>
                        <HeadCheckbox bind:dependent={content.content}/>
                    </td>
                {:else}
                    <span/>
                {/if}
            {/if}
            <td rowspan={content.rowspan}>
                <slot name="cell"
                      cell={content.total.cells[body.nesting]}/>
                {#if chunking === "collapsable" || chunking === "full"}
                    <Button text={content.collapsed ? '▼' : '▲'}
                            hint={content.collapsed ? 'Развернуть' : 'Свернуть'}
                            on:click={() => content.collapsed = !content.collapsed}
                            design="frameless"
                            size="small"/>
                {/if}
            </td>
        </tr>

        <!-- CHUNK BODY -->
        <svelte:self
                bind:body={content}>
            <svelte:fragment slot="cell" let:cell>
                <slot name="cell" {cell}/>
            </svelte:fragment>
        </svelte:self>

        <!-- CHUNK TOTAL -->
        {#if chunking !== "simple"}
            <TotalRow totalRow={content.content.length > 1 ? content.total : null}
                      collapsed={body.collapsed || !content.collapsed && chunking === "collapsable"}
                      checkboxSpan={!content.collapsed}>
                <svelte:fragment slot="cell" let:cell>
                    <slot name="cell" {cell}/>
                </svelte:fragment>
            </TotalRow>
        {/if}
    {/if}
{/each}

<style>
    td {
        border-right: var(--light-border);
        border-bottom: var(--light-border);
    }

    :global(tr *) {
        transition: 0.2s all;
    }

    /*:global(tr.collapsed *) {*/
    /*    opacity: 0   !important;*/
    /*    height: 0    !important;*/
    /*    font-size: 0 !important;*/
    /*    padding: 0   !important;*/
    /*    border: none !important;*/
    /*}*/
    :global(table :is(.collapsed, .collapsed *)) {
        opacity: 0   !important;
        height: 0    !important;
        font-size: 0 !important;
        padding: 0   !important;
        border: none !important;
    }
</style>