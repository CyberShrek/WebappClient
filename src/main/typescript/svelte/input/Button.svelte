<script lang="ts">

    import Image from "../misc/Image.svelte"

    export let
        disabled      = false,
        active        = false,

        size          = 30,
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
        class={design}
        style={`
             height: ${size}px;
             font-size: ${size / 2}px;
        `}
        title={hint}
        bind:this={root}
        on:click={event => event.preventDefault()}
        on:click
        on:mouseenter
        on:mousedown
        on:mouseup>

    {#if image && image.length > 0}
        <Image {hint}
               {image}/>
    {/if}

    {text}

    <slot/>

</button>

<style>

    button {
        cursor: pointer;
        border: var(--light-border);
        border-radius: 0.5em;
        padding: 0.35em 0.7em;
    }

    button.submit {
        background: var(--primary-color);
        color: white;
    }

    button.frameless {
        border: 0;
        background: transparent;
        padding: 0;
    }

</style>