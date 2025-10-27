<script lang="ts">
    import {useStyles} from "../util/resolver"
    import Loading from "./misc/Loading.svelte"
    import Header from "./navigation/Header.svelte"

    let scrollY: number,
        innerHeight: number,
        outerHeight: number

</script>

{#await useStyles("global", "states")}
    <Loading/>
{:then _}
    <Header/>

    <slot/>

    <!--{#if scrollY > 100}-->
    <!--    <Fix right={true}-->
    <!--         bottom={true}>-->
    <!--        <ToTopButton/>-->
    <!--    </Fix>-->
    <!--{/if}-->
{/await}

<svelte:window bind:scrollY
               bind:innerHeight
               bind:outerHeight/>