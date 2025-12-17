<script lang="ts">

    import {slide, fade} from "svelte/transition"
    import {popupMessage} from "../../../util/alert"
    import Button from "../../input/Button.svelte"
    import {isEmpty} from "../../../util/data";

    export let
        title      = "",
        hint       = "",
        state: FieldState = {
            wrong: false,
            value: null
        },

        // EXPORT
        exportCallbackName: string | null = null // "number|section|field". При значении null - поле не экспортируется

    let element: HTMLDivElement

    // Поиск порядкового номера (number) и названия родительской секции (section) в DOM. В качестве имени поля (field) используется title.
    // Результат собирается в строку в формате "number|section|field"
    $: if (exportCallbackName !== null && element) {
        let number = 0

        element.closest("form")?.querySelectorAll(".field")?.forEach((selected, index) => {
            if (selected === element) {
                number = index
                return
            }
        })

        const sectionTitle = element.closest(".section")?.querySelector(".title")?.textContent

        exportCallbackName = `${number}|${sectionTitle ?? ""}|${title}`
    }

</script>

<div class="field"
     class:wrong={state.wrong}
     bind:this={element}
     transition:fade>

    <div class="header">
        <p class="title">
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

    {#if !isEmpty(state.message ?? "")}
        <span class="message"
              class:wrong={state.wrong}
              transition:slide>
            {state.message}
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