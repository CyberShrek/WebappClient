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
                    <td class="checkbox">
                        <Switch type="checkbox"
                                bind:checked={content.checked}/>
                    </td>
                {/if}
            {/if}
            {#each content.cells as cell, i}
                {#if !cell.hidden}
                    <td class={body.table.columnTypes[i]}>
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
                    <td class="primary checkbox"
                        rowspan={content.rowspan}>
                        <HeadCheckbox bind:dependent={content.content}/>
                    </td>
                {:else}
                    <span/>
                {/if}
            {/if}
            <td rowspan={content.rowspan}
                class:content-collapsed={content.collapsed}
                class="primary {chunking}">
                    <slot name="cell"
                          cell={content.head.cells[body.nesting]}/>
            </td>
            {#if chunking === "collapsable" || chunking === "full"}
                <td class="button">
                    <Button text={content.collapsed ? '▼' : '▲'}
                            hint={content.collapsed ? 'Развернуть' : 'Свернуть'}
                            on:click={() => content.collapsed = !content.collapsed}
                            design="frameless"
                            size="small"/>
                </td>
            {/if}
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
    td.primary {
        vertical-align: top;
    }

    td.button {
        position: absolute;
        transform: translateX(-100%);
        border: none;
    }

    :global(tr *) {
        transition: 0.2s all;
    }

</style>