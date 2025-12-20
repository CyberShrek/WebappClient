<script lang="ts">

    import Button from "../../../../input/Button.svelte"

    export let
        pageLengthArray: number[],
        pageIndex: number

    $: if (pageIndex == null)
        pageIndex = 0

    $: pageLength = pageLengthArray[pageIndex]

    function prev() {
        if (pageIndex > 0)
            pageIndex--
        else
            pageIndex = pageLengthArray.length - 1
    }
    function next() {
        if (pageIndex < pageLengthArray.length - 1)
            pageIndex++
        else
            pageIndex = 0
    }

    function getPagesLength(tillIndex: number): number {
        let length = 0
        for (let i = 0; i < tillIndex; i++)
            length += pageLengthArray[i]
        return length
    }

    $: totalLength = pageLengthArray.reduce((sum, length) => sum + length, 0)

</script>

<tr>
    <td colspan=1000>
        <div class="pages-bar">
            <div class="page-info">
                {getPagesLength(pageIndex) + 1} - {pageIndex >= pageLengthArray.length - 1 ? totalLength : getPagesLength(pageIndex + 1)} из {totalLength}
            </div>
            <div class="buttons">

                <Button text="❰"
                        size="small"
                        design="white"
                        shape="circle"
                        on:click={prev}/>

                <div class="pages">
                    {#each pageLengthArray as _, index}
                        <Button text={String(index + 1)}
                                size="small"
                                design="white"
                                shape="circle"
                                active={index === pageIndex}
                                on:click={() => pageIndex = index}/>
                    {/each}
                </div>

                <Button text="❱"
                        size="small"
                        design="white"
                        shape="circle"
                        on:click={next}/>
            </div>
        </div>
    </td>
</tr>

<style>

    td {
        background: white;
        border-top: var(--light-border);
    }
    .pages-bar {
        display: flex;
        justify-content: flex-end;
    }
    .page-info {
        margin-top: auto;
        margin-bottom: auto;
        margin-right: auto;
        white-space: nowrap;
    }

    .buttons {
        display: flex;
        justify-content: flex-end;
        width: 100%;
    }

    .buttons .pages {
        display: flex;
        overflow-x: auto;
        max-width: 80vw;
    }

</style>
