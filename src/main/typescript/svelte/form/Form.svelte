<script lang="ts">
    import {createEventDispatcher} from "svelte"
    import {fade} from "svelte/transition"
    import Button from "../input/Button.svelte"
    import {DocumentExport} from "../../model/export/DocumentExport";

    export let documentExport: DocumentExport | null = null

    const dispatch = createEventDispatcher(),
        SUBMIT_EVENT = "submit"

    export let
        submitButtonText = "Подтвердить",
        statements: FieldStatements = {}

    let submitIsTouched = false


    async function dispatchSubmit(){
        documentExport?.saveForm()
        dispatch(SUBMIT_EVENT)
    }

</script>

<form in:fade={{duration: 200}}
      class:validated={submitIsTouched}>

    <slot/>

    <div class="buttons">
        <Button text={submitButtonText}
                disabled={submitIsTouched && Object.values(statements).some(statement => statement === "wrong")}
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