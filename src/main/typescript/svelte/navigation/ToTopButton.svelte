<script lang="ts">

    import Button from "../input/Button.svelte"
    import {scrollIntoElement} from "../../util/dom"
    import image from "../../../resources/img/to_top.svg"

</script>

<Button hint="Вернуться наверх"
        {image}
        size={35}
        on:click={() => scrollIntoElement(document.documentElement)}/>