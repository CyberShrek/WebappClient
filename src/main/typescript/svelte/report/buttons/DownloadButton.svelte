<script lang="ts">
    import Button from "../../input/Button.svelte"
    import image from "../../../../resources/img/download.svg"
    import {popupTimeoutAction} from "../../../util/alert"
    import {createEventDispatcher} from "svelte"

    const dispatch = createEventDispatcher(),
        CONFIRM_EVENT = "confirm"

    function download() {
        popupTimeoutAction("Экспортировать отчёт?", "Подтвердить", () => dispatch(CONFIRM_EVENT))
    }
</script>

<Button {image}
        design="white"
        hint="Экспортировать отчёт"
        on:click={download}/>