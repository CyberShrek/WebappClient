<script lang="ts">

    import {VirtualSelectModule} from "../../third-party/VirtualSelectModule"
    import {isEmpty} from "../../util/data"

    export let
        options: Options,
        picked:  (keyof Options)[],
        multiple        = false,
        search          = false,
        showKeys        = false,
        pickAllCheckbox = false,
        placeholder     = '',
        maxValues       = 0

    export const prettifyCallback: () => string = () => {

        if (picked.length == 0)
            return ""

        const prepare = (key: string) => options[key].trim() + (showKeys ? " (" + key + ")" : "")

        if (!multiple || picked.length == 1) return prepare(picked[0])

        const notPickedEntries = Object.entries(options).filter(([key, _]) => !picked.includes(key))
        let prettified: string

        if (notPickedEntries.length == 0) {
            prettified = `все (${picked.length})`
        } else if (notPickedEntries.length < picked.length / 2){
            prettified = `все, кроме ${notPickedEntries.length}: ` + notPickedEntries.map(([key, _]) =>  prepare(key)).join(", ")
        } else {
            prettified = picked.map(prepare).join(", ")
        }

        return prettified
    }

    let rootElement: HTMLDivElement,
        module: VirtualSelectModule

    $: if (options == null)
        options = {}

    $: if (picked == null)
        picked = []

    $: if(rootElement)
        recreate()

    // React to options changes
    $: if(options && module) onOptionsChange()
    async function onOptionsChange() {
        const pickCache = [...picked]
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
        module?.setValue(picked)
    }

    function recreate(){
        module?.destroy()
        module = new VirtualSelectModule(rootElement, {
            multiple,
            search,
            showKeys,
            placeholder,
            disableSelectAll: !pickAllCheckbox,
            maxValues
        })
        module.onChange(newKeys => {
            picked = newKeys
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