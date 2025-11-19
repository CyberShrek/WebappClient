<script lang="ts">
    import Button from "../../input/Button.svelte"
    import image from "../../../../resources/img/to_top.svg"
    import {scrollIntoElement} from "../../../util/dom"

    function toTop() {
        scrollIntoElement(document.documentElement)
    }
</script>

<Button {image}
        design="white"
        hint="Вернуться в начало"
        on:click={toTop}/>