<script lang="ts">

    export let
        area = 1

    let gridElement: HTMLDivElement

    $: if(gridElement){
        // gridElement.style.gridTemplateColumns = `repeat(${size}, calc((100% - ${size-1} * var(--indent)) / ${size}))`;
        gridElement.style.gridTemplateColumns = `repeat(${area}, 1fr)`;
    }

</script>

<div class="grid"
     bind:this={gridElement}>
    <slot/>
</div>

<style>
    .grid {
        display: grid;
        width: 100%;
        align-items: start;
        grid-gap: var(--indent);
    }
</style>