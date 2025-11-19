<script lang="ts">
    import Button from "../../input/Button.svelte"
    import image from "../../../../resources/img/expand.svg"

    export let
        rootElement: HTMLElement,
        isFullscreen: boolean = false

    $: isFullscreen ? enterFullscreen() : exitFullscreen()

    function toggleFullscreen() {
        isFullscreen = !isFullscreen
    }

    function exitFullscreen() {
        if(!!document.fullscreenElement) {
            document.exitFullscreen()
            document.removeEventListener("fullscreenchange", handleFullscreenChange)
        }
    }
    function enterFullscreen() {
        rootElement.requestFullscreen()
        document.addEventListener("fullscreenchange", handleFullscreenChange)
    }

    function handleFullscreenChange() {
        isFullscreen = !!document.fullscreenElement
    }

</script>

<Button {image}
        design="white"
        active={isFullscreen}
        hint="Полноэкранный режим"
        on:click={toggleFullscreen}/>