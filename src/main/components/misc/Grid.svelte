<script lang="ts">

    export let
        title: string = null,
        size = 1,
        className = ""

    let gridElement: HTMLDivElement

    $: if(gridElement){
        // gridElement.style.gridTemplateColumns = `repeat(${size}, calc((100% - ${size-1} * var(--indent)) / ${size}))`;
        gridElement.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    }

</script>

<div class="grid-wrapper">
    {#if title}
        <div class="header">
            {#if title}
                <p>{title}</p>
            {/if}
            <slot name="header"/>
        </div>
    {/if}

    <div class="{className} grid"
         bind:this={gridElement}>
        <slot/>
    </div>
</div>

<style>
    .grid-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: var(--indent);
    }

    .grid-wrapper > .header .field {
        height: auto
    }

    .grid {
        display: grid;
        grid-gap: var(--indent);
        align-items: end;
        justify-items: end;
    }
</style>