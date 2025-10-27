<script lang="ts">
    import {createEventDispatcher} from "svelte"
    import {fade} from "svelte/transition"
    import Button from "../input/Button.svelte";

    const dispatch = createEventDispatcher(),
        SUBMIT_EVENT = "submit"

    export let
        values: {[fieldId: string]: any},
        submitIsTouched = false,
        isWrong         = false


    async function handleSubmit(){
        dispatch(SUBMIT_EVENT, {formValues: values})
    }

</script>

<form in:fade={{duration: 200}}>

    <slot/>

    <div class="buttons">
        <Button submit
                text={"Подтвердить"}
                disabled={submitIsTouched && isWrong}
                on:click={() => handleSubmit()}
                on:mouseenter={() => submitIsTouched = true}/>
    </div>
</form>
<!--{JSON.stringify(value)}-->

<style>
    form {
        display: flex;
        flex-direction: column;
        width: calc(100% - 2*var(--indent));
        gap: var(--indent);
        padding: var(--indent);
        border-radius: var(--outer-border-radius);
    }

    form .message {
        font-size: medium;
        font-weight: normal;
        margin: var(--light-indent) auto 0 auto;
        filter: saturate(0.7);
    }

    form > .buttons {
        display: flex;
        gap: var(--indent);
        justify-content: end;
    }
</style>