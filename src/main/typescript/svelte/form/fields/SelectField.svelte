<script lang="ts">

    import Field from "./AbstractField.svelte"
    import {DocumentExport} from "../../../model/export/DocumentExport"
    import Select from "../../input/Select.svelte"

    export let
        // FIELD
        title      = "",
        hint       = "",
        state: FieldState = {
            value: null
        },
        // INPUT
        picked:  Options,
        options: Options,
        multiple        = false,
        search          = false,
        showCodes       = false,
        pickAllCheckbox = false,
        placeholder     = '',
        maxValues       = 0,
        // EXPORT
        documentExport: DocumentExport

    let exportCallbackName: string = "",
        prettifyCallback: () => string
    $: if (documentExport && !!exportCallbackName)
        documentExport.formValuesCallbacks[exportCallbackName] = prettifyCallback

</script>

<Field {title} {hint} {state}
       bind:exportCallbackName>

    <Select {options} {multiple} {search} {showCodes} {pickAllCheckbox} {placeholder} {maxValues}
            bind:picked
            bind:prettifyCallback/>
</Field>