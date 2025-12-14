<script lang="ts">
    import {createEventDispatcher} from "svelte"
    import {fade} from "svelte/transition"
    import Button from "../input/Button.svelte"
    import {DocumentExport} from "../../model/export/DocumentExport";

    export let documentExport: DocumentExport | null = null

    const dispatch = createEventDispatcher(),
        SUBMIT_EVENT = "submit"

    export let
        values: {[fieldId: string]: any},
        submitIsTouched = false,
        isWrong         = false


    async function dispatchSubmit(){
        documentExport?.saveForm()
        dispatch(SUBMIT_EVENT, values)
    }

</script>

<form in:fade={{duration: 200}}>

    <slot/>

    <div class="buttons">
        <Button text={"Подтвердить"}
                disabled={submitIsTouched && isWrong}
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
        gap: var(--indent);
        border-radius: var(--outer-border-radius);
    }

    form > .buttons {
        display: flex;
        gap: var(--indent);
        justify-content: end;
    }
</style>