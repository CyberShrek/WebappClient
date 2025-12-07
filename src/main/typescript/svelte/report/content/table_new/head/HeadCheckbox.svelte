<script lang="ts">

    import Switch from "../../../../input/Switch.svelte"

    export let
        dependents: (TableBodyChunk | TableRow)[]

    let checked: boolean = false

    $: if (dependents) {
        importSelection()
    }

    function exportSelection() {
        dependents.forEach(content => content.checked = checked)
        dependents = dependents
    }

    function importSelection() {
        checked = dependents.every(content => content.checked)
    }

</script>

<Switch type="checkbox"
        bind:checked
        on:change={exportSelection}/>