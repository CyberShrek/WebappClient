<script lang="ts">
    import Button from "../../input/Button.svelte"
    import image from "../../../../resources/img/collapse.svg"

    export let isCollapsed: boolean

</script>

<Button {image}
        design="white"
        hint={isCollapsed ? "Развернуть" : "Свернуть"}
        on:click={() => isCollapsed = !isCollapsed}/>