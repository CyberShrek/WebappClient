<script lang="ts">

    import Button from "./Button.svelte"
    import {tick} from "svelte"
    import {EasepickModule} from "../../third-party/EasepickModule"

    import image from "../../../resources/img/calendar.svg"

    export let
        value: string[],
        range: number = 0

    let rootElement: HTMLInputElement,
        module: EasepickModule

    $: if(rootElement)
        recreate()

    $: if(value == null && module)
        setValue(module.getValue())

    function recreate(){
        module?.destroy()
        module = new EasepickModule(rootElement, {
            range: range > 0,
            maxDays: range
        })
        module.onChange(setValue)

        if(!value)
            setValue(module.getValue())
    }

    async function setValue(newValue: string[]){
        await tick()
        value = newValue
    }

</script>

<div class="datepicker">
    <Button design="frameless"
            {image}
            size="small"
            on:click={() => rootElement.click()}/>
    <input bind:this={rootElement}>
</div>

<style>
    .datepicker {
        display: flex;
        align-items: center;
        height: 50px;
        padding-left: var(--indent);
        background: white;
        gap: var(--indent);
        box-sizing: border-box;
        border: var(--light-border);
        border-radius: var(--border-radius);
    }

    .datepicker > input {
        width: 100%;
        height: 100%;
        padding: 0 var(--indent);
        font-size: medium;
        color: var(--accent-color);
        border: none;
        border-radius: inherit;
    }

    .datepicker:focus-within {
        outline: solid thin var(--accent-color)
    }

    .datepicker > input:focus {
        outline: none;

    }
</style>