<script lang="ts">

    import Chunk from "./BodyChunk.svelte"

    export let pages: TableBodyChunk[]


</script>

<div class="spacer"/>
<tbody>
    {#each pages as page, pageIndex}
        <Chunk bind:body={page}>
            <svelte:fragment slot="cell" let:cell>
                <slot name="cell" {cell}/>
            </svelte:fragment>
        </Chunk>
    {/each}
</tbody>
<div class="spacer"/>
<style>
    .spacer {
        display: none;
    }
</style>