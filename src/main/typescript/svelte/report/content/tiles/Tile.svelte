<script lang="ts">

    import Image from "../../../misc/Image.svelte";

    export let
        title: string = "",
        label: string,
        value: number,
        color: string = '',
        image: string = ''

</script>

<div class="tile-wrapper">
    {#if title}
        <p>
            {title}
        </p>
    {/if}
    <div class="tile"
         style="background-color: {color}">
        {#if image}
            <div class="image">
                <Image {image}/>
            </div>
        {/if}
    <span class="value"
          style="color: {color.length > 0 ? color : 'var(--accent-color)'}" >
        {value}
        <span class="label">
            {label}
        </span>
    </span>
    </div>
</div>


<style>
    :root {
        --tile-color-1: #FFD2C2;
        --tile-color-2: #D1F7E8FF;
        --tile-color-3: #D2E0FAFF;
        --tile-color-4: #C8C2E4FF;

        --tile-height: 120px;
    }

    .tile-wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--light-indent);
    }

    .tile {
        display: flex;
        align-items: center;
        height: var(--tile-height);
        padding: var(--strong-indent);
        box-sizing: border-box;
        gap: var(--indent);
        border-radius: var(--border-radius);
    }

    .tile .image{
        width: calc(var(--tile-height) - 2 * var(--strong-indent));
        height: 100%;
    }

    .tile .value {
        margin: auto;
        font-size: xx-large;
        font-weight: bold;
        filter: saturate(10) brightness(0.4);
    }
    .tile .value .label {
        margin: auto;
        font-size: medium;
        font-weight: normal;
        filter: none;
    }
</style>