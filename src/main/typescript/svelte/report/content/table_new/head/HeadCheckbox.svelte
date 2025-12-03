<script lang="ts">

    import Switch from "../../../../input/Switch.svelte"

    export let
        body: BodyChunk

    let checked: boolean = false

    $: if (body) {
        importSelection()
    }

    function exportSelection() {
        body.rows.forEach(row => row.checked = checked)
        body = body
    }

    function importSelection() {
        checked = body.rows.every(row => row.checked)
    }

</script>

<Switch type="checkbox"
        bind:checked
        on:change={exportSelection}/>