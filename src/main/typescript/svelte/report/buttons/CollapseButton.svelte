<script lang="ts">
    import Button from "../../input/Button.svelte"
    import image from "../../../../resources/img/collapse.svg"

    export let collapsed: boolean

</script>

<Button {image}
        design="white"
        active={collapsed}
        hint={collapsed ? "Развернуть" : "Свернуть"}
        on:click={() => collapsed = !collapsed}/>