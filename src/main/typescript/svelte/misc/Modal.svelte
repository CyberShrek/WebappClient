<script lang="ts">

    import { fade } from 'svelte/transition'
    import {createEventDispatcher, onDestroy} from "svelte"

    const dispatch = createEventDispatcher()

    export let
        show: boolean = false,
        fullSize: boolean = false

    let rootElement: HTMLDivElement

    $: if(rootElement) document.body.appendChild(rootElement)

    // Disable scroll when modal is opened
    $: document.body.style.overflow = show === true ? "hidden" : ""

    $: if (show === false)
        dispatch("close")

    $: if(rootElement) {
        window.addEventListener("keydown", onKeydown)
        rootElement.addEventListener("click", onBackdropClick)
    } else {
        window.removeEventListener("keydown", onKeydown)
    }

    // Close on escape key
    function onKeydown(event: KeyboardEvent) {
        // if (event.key === "Escape") {
        //     show = false
        // }
    }
    // Close on backdrop click
    function onBackdropClick(event: MouseEvent) {
        if (event.target === rootElement) {
            show = false
        }
    }

    onDestroy(() => {
        window.removeEventListener("keydown", onKeydown)
        document.body.style.overflow = ""
    })

</script>
{#if show === true}
    <div bind:this={rootElement}
         class="modal-backdrop"
         role="button"
         tabindex="-1"
         transition:fade={{duration: 50}}>

        <div class="modal"
             class:full-size={fullSize}
             role="none">
            <slot/>
        </div>
    </div>
{/if}

<style>
    .modal-backdrop{
        z-index: 64;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        min-height: 100%;
        min-width: 100%;
        /*     margin-bottom: 500px !important; */
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(5px);
        overflow: auto;
    }

    .modal-backdrop > .modal {
        position: absolute;
        display: block;
        background: white;
        top: 10vh;
        max-width: calc(100vw - var(--strong-indent) * 10);
        filter: drop-shadow(var(--drop-shadow));
        overflow: clip;
        border-radius: var(--border-radius);
    }
    .modal-backdrop > .modal.full-size {
        width: 100%;
    }

    .modal-backdrop .modal::after {
        content: "";
        padding: 100vh 1px;
    }

</style>