<script lang="ts">

    import {slide} from "svelte/transition"
    import {popupMessage} from "../../../util/alert"
    import Button from "../../input/Button.svelte"
    import {isEmpty} from "../../../util/data"

    export let
        field: Field,
        showTitle: boolean = true

    let element: HTMLDivElement

    // Поиск названия родительской секции (sectionTitle) в DOM
    $: if (element) {
        console.log("search section title")
        field.sectionTitle = element.closest(".section")
            ?.querySelector(".title")
            ?.textContent ?? ""
    }

</script>

<div class="field"
     class:wrong={field.wrong}
     bind:this={element}>

    <div class="header">
        {#if showTitle}
            <p class="title">
                {field.title}
            </p>
        {/if}
        {#if field.hint}
            <Button hint="Подробнее"
                    design="frameless"
                    on:click={() => popupMessage("🛈", field.hint)}>
                🛈
            </Button>
        {/if}
    </div>

    <slot/>

    {#if !isEmpty(field.message ?? "")}
        <span class="message"
              class:wrong={field.wrong}
              transition:slide>
            {field.message}
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

    :global(form.validated) .field.wrong > :global(:not(.header, .message, .empty)){
        outline: 1px solid var(--negative-color);
    }

    .field .message {
        margin-left: auto;
        font-size: small;
    }
</style>