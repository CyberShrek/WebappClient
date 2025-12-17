<script lang="ts">
    import Button from "../../input/Button.svelte"
    import image from "../../../../resources/img/expand.svg"

    export let
        rootElement: HTMLElement,
        fullscreen: boolean = false

    $: fullscreen ? enterFullscreen() : exitFullscreen()

    function toggleFullscreen() {
        fullscreen = !fullscreen
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
        fullscreen = !!document.fullscreenElement
    }

</script>

<Button {image}
        design="white"
        active={fullscreen}
        hint="Полноэкранный режим"
        on:click={toggleFullscreen}/>