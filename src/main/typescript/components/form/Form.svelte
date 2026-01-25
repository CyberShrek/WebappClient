<script lang="ts">
    import {tick, setContext, createEventDispatcher} from "svelte"
    import { writable } from 'svelte/store';
    import {fade} from "svelte/transition"
    import Button from "../input/Button.svelte"
    import {deepCopyOf} from "../../util/data"

    const dispatch    = createEventDispatcher()
    const submitEvent = writable();
    setContext('form-submit', submitEvent);

    export let
        submitButtonText = "Подтвердить",
        fields: Fields = {}

    let submitIsTouched = false,
        submitIsDisabled = false

    $: submitIsDisabled = Object.values(fields).some(field => field.wrong)

    $: console.log("submitIsDisabled", submitIsDisabled)

    async function dispatchSubmit(){

        submitEvent.set("submit")
        await tick()
        submitEvent.set(null)
        await tick()
        dispatch("submit", deepCopyOf(fields))
        submitIsDisabled = true
    }

</script>

<form in:fade={{duration: 200}}
      class:validated={submitIsTouched}>

    <slot/>

    <div class="buttons">
        <slot name="buttons"/>
        <Button text={submitButtonText}
                disabled={submitIsTouched && submitIsDisabled}
                design="submit"
                size="large"
                on:click={dispatchSubmit}
                on:mouseenter={() => submitIsTouched = true}/>
    </div>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: var(--strong-indent);
        border-radius: var(--outer-border-radius);
    }

    form > .buttons {
        display: flex;
        gap: var(--indent);
        justify-content: end;
    }
</style>