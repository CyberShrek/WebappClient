<script lang="ts">

    import "../../../resources/css/global.css"
    import Header from "./Header.svelte"
    import Fix from "../misc/FixBox.svelte"
    import image from "../../../resources/img/to_top.svg"
    import Button from "../input/Button.svelte"
    import ToTopButton from "../report/buttons/ToTopButton.svelte";


    export let
        appInfo: AppInfo

    let scrollY: number,
        innerHeight: number,
        outerHeight: number

</script>

    <Header {appInfo}/>

    <slot/>

    {#if scrollY > 100}
        <Fix xAlign="end"
             yAlign="end">
            <ToTopButton/>
        </Fix>
    {/if}

<svelte:window bind:scrollY
               bind:innerHeight
               bind:outerHeight/>