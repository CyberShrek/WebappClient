<script lang="ts">

    import ColumnHeaders from "./ColumnHeaders.svelte"
    import ColumnOperations from "./ColumnOperations.svelte"
    import {ColumnType} from "../types";

    export let
        head: string[],
        types: ColumnType[],
        // Provides
        operations: {
            filter: string
            sort: "asc" | "desc"
        }[]

</script>

<thead>
<ColumnHeaders    {head}/>
<!--    <ColumnOperations {columnTypes}-->
<!--                      bind:columnOperations/>-->
</thead>
