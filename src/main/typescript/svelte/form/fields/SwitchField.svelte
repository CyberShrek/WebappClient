<script lang="ts">

    import FieldComponent from "./Field.svelte"
    import Switch from "../../input/Switch.svelte";

    export let
        field: Field,
        type: "checkbox" | "switch" = "switch"

    let prettifyCallback: () => string

    $: !!prettifyCallback && (field.prettyValue = prettifyCallback())

</script>

<FieldComponent bind:field
       showTitle={false}>
    <Switch title={field.title}
            {type}
            bind:checked={field.value}
            bind:prettifyCallback/>
</FieldComponent>