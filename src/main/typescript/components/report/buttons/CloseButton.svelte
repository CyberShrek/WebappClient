<script lang="ts">
    import Button from "../../input/Button.svelte"
    import image from "../../../../resources/img/close.svg"

</script>

<Button {image}
        design="white"
        hint="Закрыть"
        on:click/>