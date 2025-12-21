<script lang="ts">

    import Calendar from "../../input/Calendar.svelte"
    import Field from "./Field.svelte"
    import {equal} from "../../../util/data"

    export let
        field: CalendarField,
        range: number = 0

    let period: CalendarPeriod,
        prettifyCallback: () => string

    $: if (field.value) importChanges()
    function importChanges() {
        if (equal(field.value, period)) return
        period = field.value
    }

    $: if (period && prettifyCallback) exportChanges()
    async function exportChanges() {
        field.value = period
        field.prettyValue = prettifyCallback()
    }

</script>

<Field bind:field>
    <Calendar {range}
              bind:period
              bind:prettifyCallback/>
</Field>