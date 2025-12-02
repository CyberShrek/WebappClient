<script lang="ts">
    import {TableBody} from "./TableBody"
    import Chunk from "./Chunk.svelte";

    export let body: TableBody

</script>

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
