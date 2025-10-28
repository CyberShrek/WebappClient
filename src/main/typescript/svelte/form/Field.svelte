<script lang="ts">

    import {slide, fade} from "svelte/transition"
    import {onMount} from "svelte"

    export let
        title      = "",
        info       = "",
        message    = "",
        isWrong    = false,
        isReady    = false
 
    onMount(() => {
        isReady = true
    })

</script>

<div class="field"
     {title}
     class:wrong={isWrong}
     transition:fade>

    <div class="header">
        <p>
            {title}
        </p>
        {#if info}
            <span title="{info}">
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
        max-width: 25vw;
    }

    .field:is(.switch-field, .select-field, .text-field, .calendar-field, .number-field) {
        height: 100%;
        width: 100%;
    }
    /* .field.switch-field .switch, .field.range-field .range {
        margin-bottom: auto;
    } */
    .field.number-field :is(.number, .range){
        display: flex;
        align-items: center;
        gap: var(--indent);
    }
    .field.number-field .range > input{
        width: 100%;
    }

    .field > .header {
        padding: 0;
        display: flex;
        /*     height: 10px; */
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

    .field > p:empty {
        margin: 0;
    }

    .field > label:empty {
        width: 1px;
    }

    .field.wrong :is(.multiselect){
        outline: thin solid var(--negative-color);
    }

</style>