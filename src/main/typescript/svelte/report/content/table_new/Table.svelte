<script lang="ts">

    export let
        head: string[],
        body: (string | number | boolean | null)[][]


    let operations: {
            filter: string
            sort:   "asc" | "desc"
        }[],
        types: ("string" | "number" | "boolean")[] = []

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

<table>

</table>

<style>
    table {
        border-spacing: 0;
        overflow-x: scroll;
        background: white;
        padding-bottom: var(--indent);
    }
</style>
