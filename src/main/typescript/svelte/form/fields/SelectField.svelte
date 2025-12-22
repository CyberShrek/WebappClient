<script lang="ts">

    import FieldComponent from "./Field.svelte"
    import Select from "../../input/Select.svelte"
    import {equal} from "../../../util/data"
    import { getContext } from 'svelte'

    const submitEvent = getContext('form-submit')

    export let
        field: Field,
        options: Options,
        multiple        = false,
        search          = false,
        showKeys        = false,
        pickAllCheckbox = false,
        placeholder     = '',
        maxValues       = 0

    let picked: (keyof Options)[] = [],
        prettifyCallback: () => string

    $: if (field.value) importChanges()
    function importChanges() {
        if (equal(field.value, picked)) return
        picked = field.value
    }

    $: if (picked && !!prettifyCallback) exportChanges()
    async function exportChanges() {
        field.value = picked
    }

    $: if ($submitEvent) setPrettyValue()
    function setPrettyValue() {
        field.prettyValue = prettifyCallback()
    }

</script>

<FieldComponent bind:field>
    <Select {options} {multiple} {search} {showKeys} {pickAllCheckbox} {placeholder} {maxValues}
            bind:picked
            bind:prettifyCallback/>
</FieldComponent>