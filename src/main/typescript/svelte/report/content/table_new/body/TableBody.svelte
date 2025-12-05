<script lang="ts">
    import Chunk from "./BodyChunk.svelte"

    export let body: TableBodyChunk

</script>

<tbody>
    <Chunk bind:body>
        <svelte:fragment slot="cell" let:cell>
            <slot name="cell" {cell}/>
        </svelte:fragment>
    </Chunk>
</tbody>
