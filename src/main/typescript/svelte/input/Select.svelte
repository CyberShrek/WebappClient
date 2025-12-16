<script lang="ts">

    import {VirtualSelectModule} from "../../third-party/VirtualSelectModule"
    import {isEmpty} from "../../util/data";

    export let
        picked:  Options,
        options: Options,
        multiple        = false,
        search          = false,
        showCodes       = false,
        pickAllCheckbox = false,
        placeholder     = '',
        maxValues       = 0

    export const prettifyCallback: () => string = () => {

        const pickedEntries = Object.entries(picked || {})
        if (pickedEntries.length == 0)
            return ""

        const prepare = (entry: [string, string]) => entry[1] + (showCodes ? " (" + entry[0] + ")" : "")

        if (!multiple || pickedEntries.length == 1) return prepare(pickedEntries[0])

        const notPickedEntries = Object.entries(options).filter(([key]) => picked[key] == null)
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

    $: if (picked == null)
        picked = {}

    $: if(rootElement)
        recreate()

    // React to options changes
    $: if(options && module) onOptionsChange()
    async function onOptionsChange() {
        const pickCache = Object.keys(picked)
        await module.setOptions(Object.entries(options)
            .map(([key, value]) => {return {
                value: key,
                label: value,
                alias: key,
                description: key
            }})
        )
        setTimeout(() => {
            if (!isEmpty(pickCache))
                module.setValue(Object.keys(options).filter(key => pickCache.includes(key)))
        }, 10)
    }

    // Handle value changes
    $: if(options && picked !== undefined) onValueChange()
    function onValueChange() {
        module?.setValue(Object.keys(picked))
    }

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
            picked = {}
            newKeys = newKeys ?? []
            newKeys.forEach(key => picked[key] = options[key])
        })
    }

</script>

<div class="select"
     class:empty={isEmpty(options)}
     bind:this={rootElement}>

</div>

<style>

    .select {
        border-radius: var(--border-radius);
    }

</style>