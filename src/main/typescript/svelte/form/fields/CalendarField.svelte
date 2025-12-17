<script lang="ts">

    import Calendar from "../../input/Calendar.svelte"
    import Field from "./AbstractField.svelte"
    import {DocumentExport} from "../../../model/export/DocumentExport"

    export let
        // FIELD
        title      = "",
        hint       = "",
        state: FieldState = {
            value: null
        },
        // INPUT
        period: CalendarPeriod,
        range: number = 0,
        // EXPORT
        documentExport: DocumentExport

    let exportCallbackName: string = "",
        prettifyCallback: () => string
    $: if (documentExport && !!exportCallbackName)
        documentExport.formValuesCallbacks[exportCallbackName] = prettifyCallback

</script>

<Field {title} {hint} {state}
       bind:exportCallbackName>

    <Calendar {range}
              bind:period
              bind:prettifyCallback/>
</Field>