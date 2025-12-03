<script lang="ts">
    import Chunk from "./BodyChunk.svelte"
    import {tick} from "svelte";

    export let body: BodyChunk

    let element: HTMLTableSectionElement

    // Группировка заголовков чанков по rowspan
    $: if (body && element) tick().then(respan)
    function respan() {
        const shift = body.table.config.addCheckboxes ? 1 : 0
        for (let nesting = shift;
             body.table.types[nesting + 1 - shift] === "string";
             nesting++) {
            let chunkHead: HTMLTableCellElement | null = null
            for (let row of element.rows) {
                const cell = row.cells.item(nesting)
                if (cell == null)
                    continue

                if (cell.textContent?.trim() !== '') {
                    chunkHead = cell
                    if (chunkHead != null) {
                        chunkHead.style.display = ''
                        chunkHead.rowSpan = 1
                    }
                }
                else if (chunkHead != null) {
                    chunkHead.rowSpan++
                    cell.style.display = "none"
                    cell.rowSpan = 1
                }
            }
        }
    }

</script>

<tbody bind:this={element}>
    <Chunk chunk={body}>
        <svelte:fragment slot="cell" let:cell>
            <slot name="cell" {cell}/>
        </svelte:fragment>
    </Chunk>
</tbody>
