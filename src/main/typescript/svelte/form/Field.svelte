<script lang="ts">

    import {slide, fade} from "svelte/transition"
    import {onMount} from "svelte"

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
            <span title="{hint}">
                🛈
            </span>
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
        justify-content: end;
        justify-self: start;
        gap: var(--light-indent);
        width: 100%;
    }

    .field > .header {
        padding: 0;
        display: flex;
        justify-content: space-between;
        align-items: end;
    }
    .field > .header:empty {
        display: none;
    }
    .field > .header > :is(p, span) {
        margin: 0;
        white-space: nowrap;
        font-weight: normal;
        font-size: 18px;
        height: 20px;
    }
    .field.wrong > .header{
        color: var(--negative-color);
    }
</style>