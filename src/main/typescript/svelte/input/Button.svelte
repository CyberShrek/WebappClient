<script lang="ts">

    import Image from "../misc/Image.svelte"

    export let
        disabled      = false,
        active        = false,

        size: "small"
            | "medium"
            | "large" = "medium",
        design: "basic"
            | "frameless"
            | "submit"
            | "cancel" = "basic",

        hint          = "",
        text          = "",
        image         = "",
        root: null |HTMLButtonElement = null

</script>

<button class:disabled
        class:active
        class="{size} {design}"
        title={hint}
        bind:this={root}
        on:click={event => event.preventDefault()}
        on:click
        on:mouseenter
        on:mousedown
        on:mouseup>

    {#if image && image.length > 0}
        <Image {hint}
               {size}
               {image}/>
    {/if}

    {text}

    <slot/>

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
        min-height: var(--button-height-small);
        padding: 0 var(--indent);
        font-size: small;
    }
    button.medium {
        min-height: var(--button-height-medium);
        padding: var(--light-indent) var(--indent);
        font-size: medium;
    }
    button.large {
        min-height: var(--button-height-large);
        padding: var(--indent) var(--strong-indent);
        font-size: large;
    }

    button.submit {
        background: var(--accent-color);
        border: none;
        color: white;
        box-shadow: var(--shadow);
    }

    button.frameless {
        /*min-height: 0;*/
        padding: 0;
        border: 0;
        background: transparent;
    }

    button:hover {
        filter: brightness(1.2);
    }

    button:active {
        filter: brightness(0.8);
    }

</style>