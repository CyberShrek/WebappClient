<script lang="ts">

    import Switch from "../../../../input/Switch.svelte"

    export let
        dependent: (TableBodyChunk | TableRow)[]

    let checked: boolean = false

    $: if (dependent) {
        importSelection()
    }

    function exportSelection() {
        const select = (content: TableBodyChunk | TableRow) => {
            switch (content.type) {
                case "row"  : content.checked = checked; break
                case "chunk": content.content.forEach(select)
            }
        }
        dependent.forEach(select)
        dependent = dependent
    }

    function importSelection() {
        const selected = (content: TableBodyChunk | TableRow) => {
            switch (content.type) {
                case "row"  : return content.checked
                case "chunk": return content.content.every(selected)
            }
        }
        checked = dependent.every(selected)
    }

</script>

<Switch type="checkbox"
        bind:checked
        on:change={exportSelection}/>