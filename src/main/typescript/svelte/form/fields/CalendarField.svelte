<script lang="ts">

    import Calendar from "../../input/Calendar.svelte"
    import FieldComponent from "./Field.svelte"
    import {equal} from "../../../util/data"

    export let
        field: Field,
        range: number = 0

    let period: CalendarPeriod,
        prettifyCallback: () => string

    $: if (field.value) importChanges()
    function importChanges() {
        if (equal(field.value, period)) return
        period = field.value
    }

    $: if (period && !!prettifyCallback) exportChanges()
    async function exportChanges() {
        field.value = period
        field.prettyValue = prettifyCallback()
    }

</script>

<FieldComponent bind:field>
    <Calendar {range}
              bind:period
              bind:prettifyCallback/>
</FieldComponent>