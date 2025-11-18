<script lang="ts">
    import Button from "../../input/Button.svelte"
    import image from "../../../../resources/img/expand.svg"
    import {toggleFullscreen} from "../../../util/dom";

    export let rootElement: HTMLElement

</script>

<Button {image}
        design="white"
        hint="Полноэкранный режим"
        on:click={() => toggleFullscreen(rootElement)}/>