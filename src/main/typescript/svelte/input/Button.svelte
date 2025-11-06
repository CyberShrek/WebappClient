<script lang="ts">

    import Image from "../misc/Image.svelte"

    export let
        disabled      = false,
        active        = false,

        frameless     = false,
        submit        = false,
        cancel        = false,
        size          = 25,

        hint          = "",
        text          = "",
        image         = "",
        root: null |HTMLButtonElement = null

</script>

<button class:disabled
        class:frameless
        class:submit
        class:cancel
        class:active
        style={`height: ${size}px; width: ${size}px;`}
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
    }

    button.frameless {
        border: 0;
        background: transparent;
        padding: 0;
    }

</style>