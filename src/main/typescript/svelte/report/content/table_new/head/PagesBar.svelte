<script lang="ts">

    import Button from "../../../../input/Button.svelte";

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
            <Button text="❰"
                    size="small"
                    design="white"
                    on:click={prev}/>

            <div class="pages">
                {#each Array(pagesLength) as _, index}
                    <Button text={String(index + 1)}
                            size="small"
                            design="white"
                            active={index === pageIndex}
                            on:click={() => pageIndex = index}/>
                {/each}
            </div>

            <Button text="❱"
                    size="small"
                    design="white"
                    on:click={next}/>
        </div>
    </td>
</tr>

<style>

    .pages-bar {
        display: flex;
    }

    .pages {
        display: flex;
    }

</style>
