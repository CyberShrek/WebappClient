<script lang="ts">
    import Template from "../main/typescript/svelte/index/Template.svelte"
    import Form from "../main/typescript/svelte/form/Form.svelte"
    import Section from "../main/typescript/svelte/form/Section.svelte"
    import Field from "../main/typescript/svelte/form/Field.svelte"
    import Calendar from "../main/typescript/svelte/input/Calendar.svelte";

    const appInfo: AppInfo = {
        code: "debug"
    }

    let values: {
        [fieldId: string]: any
    } = {}

</script>

<Template {appInfo}>
    <Form {values}>
        <Section title="Какая-то секция" size={2}>
            <Field title="Поле-1"
                   hint="Информация"
                   message="Какое-то сообщение">
                <Calendar bind:value={values.fie}/>
            </Field>
            <Field title="Поле-2"
                   isWrong={true}
                   message="Какая-то ошибка">

            </Field>
        </Section>

        values: {JSON.stringify(values)}
    </Form>
</Template>