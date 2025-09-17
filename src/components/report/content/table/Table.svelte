<script lang="ts">

    import Body from "./body/Body.svelte"
    import {createEventDispatcher} from "svelte"
    import Head from "./head/Head.svelte"
    import Foot from "./foot/Foot.svelte"
    import {ColumnType} from "./types";
    import Loading from "../../../misc/Loading.svelte";
    import {resolveStyle} from "../../../../util/resolver";

    const dispatch = createEventDispatcher()

    export let
        head: string[],
        body: (string | number | boolean | null)[][],
        foot: (string | number | boolean | null)[] | null = null


    let operations: {
            filter: string
            sort:   "asc" | "desc"
        }[],
        types: ColumnType[] = []

    $: if (body?.length > 0) determineTypes()

    function determineTypes() {
        types = head.map(() => "string")
        body.forEach(row => {
            row.forEach((cell, cellI) => {
                if (cell != null && typeof cell === "number")
                    types[cellI] = "number"
                else if (cell != null && typeof cell === "boolean")
                    types[cellI] = "boolean"
            })
        })
    }

</script>

{#await resolveStyle("table")}
    <Loading/>
{:then _}
    <table>
        <Head {head}
              {types}
              bind:operations>
        </Head>

        {#if foot && foot.length > 0}
            <Foot {foot}
                  {types}/>
        {/if}

        <Body {body}
              {types}/>
    </table>
{/await}
