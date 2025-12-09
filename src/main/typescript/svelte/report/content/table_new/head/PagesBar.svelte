<script lang="ts">

    import Button from "../../../../input/Button.svelte"

    export let
        pagesLength: number,
        pageIndex: number

    $: if (pageIndex == null)
        pageIndex = 0

    function prev() {
        if (pageIndex > 0)
            pageIndex--
        else
            pageIndex = pagesLength - 1
    }
    function next() {
        if (pageIndex < pagesLength - 1)
            pageIndex++
        else
            pageIndex = 0
    }

</script>

<tr>
    <td colspan=1000>
        <div class="pages-bar">
            <div class="buttons">
                <Button text="❰"
                        size="small"
                        design="white"
                        shape="circle"
                        on:click={prev}/>

                <div class="pages">
                    {#each Array(pagesLength) as _, index}
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
    }
    .pages-bar {
        display: flex;
        justify-content: flex-end;

    }

    .buttons {
        display: flex;
        justify-content: flex-end;
        max-width: calc(100vw - 2 * var(--strong-indent) - 2 * var(--indent));
    }

    .buttons .pages {
        display: flex;
        overflow-x: auto;
        /*max-width: 50vw;*/
    }

</style>
