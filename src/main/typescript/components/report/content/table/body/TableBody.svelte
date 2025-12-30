<script lang="ts">

    import Chunk from "./BodyChunk.svelte"

    export let pages: TableBodyChunk[],
        pageIndex: number = 0

</script>

{#each pages as page, index}
    {#if index === pageIndex}
        <tbody>
            <Chunk bind:body={page}>
                <svelte:fragment slot="cell" let:cell>
                    <slot name="cell" {cell}/>
                </svelte:fragment>
            </Chunk>
        </tbody>
    {/if}
{/each}