<script lang="ts">

    import {VirtualSelectModule} from "../../third-party/VirtualSelectModule"

    type Options = { [key: string]: string}

    export let
        value:   Options,
        options: Options,
        multiple        = false,
        search          = false,
        showCodes       = false,
        pickAllCheckbox = false,
        placeholder     = '',
        maxValues       = 0

    export const prettifyCallback: () => string = () => {

        const pickedEntries = Object.entries(value || {})
        if (pickedEntries.length == 0)
            return ""

        const prepare = (entry: [string, string]) => entry[1] + (showCodes ? " (" + entry[0] + ")" : "")

        if (!multiple || pickedEntries.length == 1) return prepare(pickedEntries[0])

        const notPickedEntries = Object.entries(options).filter(([key]) => value[key] == null)
        let prettified: string

        if (notPickedEntries.length == 0) {
            prettified = `все (${pickedEntries.length})`
        } else if (notPickedEntries.length < pickedEntries.length / 2){
            prettified = `все, кроме ${notPickedEntries.length}: ` + notPickedEntries.map(prepare).join(", ")
        } else {
            prettified = pickedEntries.map(prepare).join(", ")
        }

        return prettified
    }

    let rootElement: HTMLDivElement,
        module: VirtualSelectModule

    $: if (options == null)
        options = {}

    $: if (value == null)
        value = {}

    $: if(rootElement)
        recreate()

    // React to options changes
    $: if(options && module) {
        module.setOptions(Object.entries(options)
            .map(([key, value]) => {return {
                value: key,
                label: value,
                alias: key,
                description: key
            }})
        )
    }

    // Handle value changes
    $: if(options && value !== undefined)
        module?.setValue(Object.keys(value))

    function recreate(){
        module?.destroy()
        module = new VirtualSelectModule(rootElement, {
            multiple,
            search,
            showCodes,
            placeholder,
            disableSelectAll: !pickAllCheckbox,
            maxValues
        })
        module.onChange(newKeys => {
            value = {}
            newKeys = newKeys ?? []
            newKeys.forEach(key => value[key] = options[key])
        })
    }

</script>

<div class="select" bind:this={rootElement}>

</div>

<style>

    .select {
        border-radius: var(--border-radius);
    }

</style>