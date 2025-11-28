<script lang="ts">
    import Decimal from "decimal.js-light";
    import TotalRow from "./TotalRow.svelte";
    import Button from "../../../input/Button.svelte";
    import {tick} from "svelte";

    export let
        data: (string | number | boolean | null)[][],
        types: ("string" | "number" | "boolean")[],
        chunking: "none" | "simple" | "totals" | "collapsable" | "full" = "none",
        bodyElement: HTMLTableSectionElement,

        collapsed: boolean = false,
        nesting: number = 0

    let dataChunks: typeof data[] = [],
        collapsedChunks: boolean[] = [],
        chunksWithTotals: boolean[] = []

    $: addTotals = chunking === "totals" || chunking === "full"
    $: addCollapsing = chunking === "collapsable" || chunking === "full"

    // Дробление данных и предварительный расчет итогов
    $: if (chunking !== "none" && data?.length > 0 && types?.[nesting + 1] === "string") {
        dataChunks = []
        let lastName: string
        let lastChunk: typeof data = []

        data.forEach(row => {
            const name = row[nesting] as string
            if (name !== lastName) {
                if (lastChunk.length > 0) {
                    dataChunks.push(lastChunk)
                }
                lastChunk = [row]
            } else {
                lastChunk.push(row)
            }
            lastName = name
        })
        if (lastChunk.length > 0) {
            dataChunks.push(lastChunk)
        }

    }
    else {
        dataChunks = []
    }

    // Группировка чанков по rowspan
    $: if (chunking != "none" && bodyElement) {
        setTimeout(() => {
            let chunkHead: HTMLTableCellElement | null = null
            for (let row of bodyElement.rows) {
                const cell = row.cells.item(nesting)
                if (cell == null)
                    continue

                if (cell.textContent?.trim() !== '') {
                    chunkHead = cell
                    chunkHead.style.display = ''
                    chunkHead.rowSpan = 1
                }
                else if (chunkHead != null) {
                    chunkHead.rowSpan++
                    cell.style.display = "none"
                    cell.rowSpan = 1
                }
            }
        }, 1000)
    }

    // Группировка чанков по rowspan
    // $: if (chunking != "none" && bodyElement && nesting === 0) {
    //     processRows();
    // }
    //
    // async function processRows() {
    //     await tick(); // Ждем обновления DOM
    //
    //     let chunkHead: HTMLTableCellElement | null = null;
    //
    //     for (let row of bodyElement.rows) {
    //         const cell = row.cells.item(nesting);
    //         if (cell == null) continue;
    //
    //         if (cell.textContent?.trim() !== '') {
    //             chunkHead = cell;
    //             chunkHead.style.display = '';
    //             chunkHead.rowSpan = 1;
    //         } else if (chunkHead != null) {
    //             chunkHead.rowSpan++;
    //             cell.style.display = "none";
    //             cell.rowSpan = 1;
    //         }
    //
    //         // Задержка между итерациями
    //         await new Promise(resolve => setTimeout(resolve, 50));
    //     }
    // }

</script>

{#if dataChunks?.length > 0}
    {#each dataChunks as chunk, chunkIndex}

        <!-- CHUNK HEAD -->
        {#if chunk.length > 1}
            <tr>
                <!--{#if chunkIndex !== 0}-->
                {#each Array(nesting) as _}
                    <td/>
                {/each}
                <!--{/if}-->
                <td rowspan={1}>
                    <slot name="cell"
                          columnIndex={nesting}
                          value={chunk[0][nesting]}
                          type={types[nesting]}/>
                    {#if addCollapsing}
                        <Button text={collapsedChunks[chunkIndex] ? '▼' : '▲'}
                                hint={collapsedChunks[chunkIndex] ? 'Развернуть' : 'Свернуть'}
                                on:click={() => collapsedChunks[chunkIndex] = !collapsedChunks[chunkIndex]}
                                design="frameless"
                                size="small"/>
                    {/if}
                </td>
            </tr>
        {/if}

        <!-- CHUNK BODY -->
        {#if !collapsedChunks[chunkIndex]}
            <svelte:self
                    data={chunk}
                    {types}
                    {chunking}
                    {bodyElement}
                    collapsed={!!collapsedChunks[chunkIndex]}
                    nesting={nesting + 1}>
                <svelte:fragment slot="cell" let:columnIndex let:row let:value let:type>
                    <slot name="cell" {columnIndex} {row} {value} {type}/>
                </svelte:fragment>
            </svelte:self>
        {/if}

        <!-- CHUNK TOTAL -->
        {#if chunking === "totals" || chunking === "full" || chunking === "collapsable" && !!collapsedChunks[chunkIndex]}
            <TotalRow data={chunk}
                      {types}
                      {nesting}>
                <svelte:fragment slot="cell" let:columnIndex let:row let:value let:type>
                    <slot name="cell" {columnIndex} {row} {value} {type}/>
                </svelte:fragment>
            </TotalRow>
        {/if}
    {/each}
{:else}
    {#each data as row }
        <tr>
            {#each row as value, columnIndex}
                <td>
                    {#if columnIndex >= nesting || columnIndex === nesting - 1 && data.length === 1}
                        <slot name="cell" {columnIndex} {row} {value}
                              type={types[columnIndex]}/>
                    {/if}
                </td>
            {/each}
        </tr>
    {/each}
{/if}

<style>
    td {
        border: var(--light-border);
    }
</style>