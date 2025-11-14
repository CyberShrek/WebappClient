<script lang="ts">

    import {slide, fade} from "svelte/transition"
    import {onMount} from "svelte"
    import {popupMessage} from "../../util/alert";
    import Button from "../input/Button.svelte";

    export let
        title      = "",
        hint       = "",
        message    = "",
        isWrong    = false,
        isReady    = false
 
    onMount(() => {
        isReady = true
    })

</script>

<div class="field"
     class:wrong={isWrong}
     transition:fade>

    <div class="header">
        <p>
            {title}
        </p>
        {#if hint}
            <Button hint="Подробнее"
                    design="frameless"
                    on:click={() => popupMessage("🛈", hint)}>
                🛈
            </Button>
        {/if}
    </div>

    <slot/>

    {#if message?.length > 0}
        <span class="message"
              class:wrong={isWrong}
              transition:slide>
            {message}
        </span>
    {/if}
</div>

<style>

    .field {
        display: flex;
        flex-direction: column;
        justify-content: start;
        width: 100%;
    }

    .field > .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: var(--light-indent);
        align-items: center;
        font-size: large;
        height: 20px;
    }

    .field > .header:empty {
        display: none;
    }
    .field > .header > :is(p, span) {
        margin: 0;
        white-space: nowrap;
        font-weight: normal;
    }

    .field.wrong > :global(:not(.header, .message)){
        outline: 1px solid var(--negative-color);
    }

    .field .message {
        margin-left: auto;
        font-size: small;
    }
</style>