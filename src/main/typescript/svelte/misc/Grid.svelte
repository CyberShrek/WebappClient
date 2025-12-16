<script lang="ts">

    export let
        area = 1

    let gridElement: HTMLDivElement

    $: if(gridElement){
        gridElement.style.gridTemplateColumns = `repeat(${area}, calc((100% - ${area-1} * var(--indent)) / ${area}))`;
        // gridElement.style.gridTemplateColumns = `repeat(${area}, 1fr)`;
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
        grid-gap: var(--indent);
    }
</style>