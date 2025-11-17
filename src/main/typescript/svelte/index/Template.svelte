<script lang="ts">

    import "../../../resources/css/global.css"
    import Header from "./Header.svelte"
    import Fix from "../misc/Fix.svelte"
    import image from "../../../resources/img/to_top.svg"
    import {scrollIntoElement} from "../../util/dom"
    import Button from "../input/Button.svelte"


    export let
        appInfo: AppInfo

    let scrollY: number,
        innerHeight: number,
        outerHeight: number

</script>

    <Header {appInfo}/>

    <slot/>

    {#if scrollY > 100}
        <Fix right
             bottom>
            <Button hint="Вернуться наверх"
                    design="frameless"
                    {image}
                    on:click={() => scrollIntoElement(document.documentElement)}/>
        </Fix>
    {/if}

<svelte:window bind:scrollY
               bind:innerHeight
               bind:outerHeight/>