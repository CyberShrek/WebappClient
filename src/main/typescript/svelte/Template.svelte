<script lang="ts">
    import Header from "./navigation/Header.svelte"
    import Fix from "./misc/Fix.svelte"
    import ToTopButton from "./navigation/ToTopButton.svelte"

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
            <ToTopButton/>
        </Fix>
    {/if}

<svelte:window bind:scrollY
               bind:innerHeight
               bind:outerHeight/>