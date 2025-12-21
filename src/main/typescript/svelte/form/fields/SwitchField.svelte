<script lang="ts">

    import Field from "./Field.svelte"
    import Switch from "../../input/Switch.svelte";

    export let
        field: SwitchField,
        type: "checkbox" | "switch" = "switch"

    let prettifyCallback: () => string

    $: !!prettifyCallback && (field.prettyValue = prettifyCallback())

</script>

<Field bind:field
       showTitle={false}>
    <Switch title={field.title}
            {type}
            bind:checked={field.value}
            bind:prettifyCallback/>
</Field>