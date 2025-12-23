<script lang="ts">

    import Image from "../../../misc/Image.svelte"

    import {createEventDispatcher} from "svelte"
    const dispatch = createEventDispatcher()

    export let
        title: string = "",
        label: string = "",
        value: string | number | boolean = "",
        color: string = '',
        image: string = '',
        change: number = 0,
        valueSize: string = 'xx-large',
        clickable: boolean = false

    function click() {
        if (clickable) dispatch('click')
    }

</script>

<div class="tile-wrapper">
    {#if title}
        <p>
            {title}
        </p>
    {/if}
    <div class="tile"
         class:clickable
         style="background-color: {color}"
         on:click={click}>
        {#if image}
            <div class="image">
                <Image {image}/>
            </div>
        {/if}
        <div class="block">
            <span class="value"
                  style="color: {color.length > 0 ? color : 'var(--accent-color)'}; font-size: {valueSize}" >
                {value}
                <span class="label">
                    {label}
                </span>
                {#if change && change !== 0}
                    <span class="change {change > 0 ? 'up' : 'down'}">
                        {change > 0 ? '+' : ''}{change}%
                    </span>
                {/if}
            </span>
            <slot/>
        </div>
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
        justify-content: center;
        height: var(--tile-height);
        padding: var(--strong-indent);
        box-sizing: border-box;
        gap: var(--indent);
        border-radius: var(--border-radius);
    }

    .tile .image{
        width: calc(var(--tile-height) - 1 * var(--indent));
        height: 100%;
    }

    .tile .block {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        width: 100%;
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
    .tile .value .change {
        position: absolute;
        font-size: medium;
    }
    .tile .value .change.up {
        color: green;
    }
    .tile .value .change.down {
        color: red;
    }



    .tile.clickable {
        cursor: pointer;
    }
    .tile.clickable:hover {
        filter: brightness(0.9);
    }
    .tile.clickable:active {
        filter: brightness(0.8);
    }
</style>