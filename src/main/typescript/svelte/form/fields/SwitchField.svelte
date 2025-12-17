<script lang="ts">

    import Field from "./AbstractField.svelte"
    import {DocumentExport} from "../../../model/export/DocumentExport"
    import Switch from "../../input/Switch.svelte";

    export let
        // FIELD
        title      = "",
        hint       = "",
        state: FieldState = {
            value: null
        },
        // INPUT
        checked: boolean = false,
        type: "checkbox" | "switch" = "switch",
        // EXPORT
        documentExport: DocumentExport

    let exportCallbackName: string = "",
        prettifyCallback: () => string
    $: if (documentExport && !!exportCallbackName)
        documentExport.formValuesCallbacks[exportCallbackName] = prettifyCallback

</script>

<Field {hint} {state}
       bind:exportCallbackName>
    <Switch {title}
            {type}
            bind:checked
            bind:prettifyCallback/>
</Field>