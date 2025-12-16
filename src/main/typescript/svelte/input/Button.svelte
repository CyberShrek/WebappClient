<script lang="ts">

    import Image from "../misc/Image.svelte"
    import {slide} from "svelte/transition"

    export let
        disabled      = false,
        active        = false,

        size: "small"
            | "medium"
            | "large" = "medium",
        design: "basic"
            | "white"
            | "frameless"
            | "submit"
            | "cancel" = "basic",
        shape: "circle"
            | "rectangle" = "rectangle",

        hint          = "",
        text          = "",
        image         = "",
        slideAxis: "x" | "y" = "x",
        root: null |HTMLButtonElement = null

    let showContent = true

</script>

<button class:disabled
        class:active
        class="{size} {design} {shape}"
        class:text
        class:image
        title={hint}
        bind:this={root}
        on:click={event => event.preventDefault()}
        on:click
        on:mouseenter
        on:mousedown
        on:mouseup
        transition:slide={{axis: slideAxis}}>

    {#if image && image.length > 0}
        <Image {hint}
               {size}
               {image}/>
    {/if}

    {text}

</button>

<style>

    :root {
        --button-height-small: 24px;
        --button-height-medium: 36px;
        --button-height-large: 48px;
    }

    button {
        display: flex;
        align-items: center;
        cursor: pointer;
        border: var(--light-border);
        border-radius: var(--border-radius);
        background: var(--secondary-color);
        color: var(--accent-color);
        vertical-align: center;
    }

    button.small {
        max-height: var(--button-height-small);
        padding: 0;
        font-size: small;
    }
    button.medium {
        height: var(--button-height-medium);
        padding: var(--light-indent);
        font-size: medium;
    }
    button {
        height: var(--button-height-large);
        padding: var(--indent);
        font-size: large;
    }
    button.text {
        padding-left: var(--indent);
        padding-right: var(--indent);
    }
    button.large.text {
        padding-left: var(--strong-indent);
        padding-right: var(--strong-indent);
    }

    button.submit {
        background: var(--accent-color);
        border: none;
        color: white;
        box-shadow: var(--box-shadow);
    }

    button.white {
        background: white;
        border: none;
    }

    button.frameless {
        /*min-height: 0;*/
        padding: 0;
        border: 0;
        background: transparent;
    }

    button.circle {
        border-radius: 1000px;
    }

    button:hover {
        filter: brightness(1.2);
    }
    button.white:hover {
        filter: none;
        background: var(--secondary-color);
    }

    button:is(.active, :active) {
        filter: brightness(0.8) !important;
    }

    button.disabled {
        opacity: 0.5;
        pointer-events: none;
    }

</style>