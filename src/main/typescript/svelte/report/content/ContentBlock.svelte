<script lang="ts">

    import Modal from "../../misc/Modal.svelte"
    import {slide, blur} from "svelte/transition"

    export let
        title = "",
        modal = false,
        width = "auto",
        align = "stretch"
    let show: boolean

</script>

<div class="content"
     style="width: {width}; align-self: {align};"
     in:blur out:slide>
    {#if modal}
        <a href=""
           on:click={(ev) => {ev.preventDefault() ; show = true}}>
            {title.length > 0 ? title : "Показать"}
        </a>
        <Modal bind:show>
            <slot/>
        </Modal>
    {:else}
        {#if title}
            <div class="header">
                <h3>{title}</h3>
            </div>
        {/if}
        <slot/>
    {/if}
</div>

<style>
    .content {
        padding: 0 var(--indent);
    }
    a {
    }
</style>