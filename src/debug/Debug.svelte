<script lang="ts">
    import Template from "../main/typescript/svelte/index/Template.svelte"
    import Form from "../main/typescript/svelte/form/Form.svelte"
    import Section from "../main/typescript/svelte/form/Section.svelte"
    import Field from "../main/typescript/svelte/form/Field.svelte"
    import Calendar from "../main/typescript/svelte/input/Calendar.svelte";
    import Select from "../main/typescript/svelte/input/Select.svelte";

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
            <Field title="Календарь"
                   hint="Информация"
                   message="Какое-то сообщение">
                <Calendar bind:value={values.calendar}
                          range={10}/>
            </Field>
            <Field isWrong={true}
                   message="Какая-то ошибка">

            </Field>

            <Field title="Cелект">
                <Select bind:value={values.select}
                        options={{
                            "opt-1": "Опция 1",
                            "opt-2": "Опция 2",
                            "opt-3": "Опция 3",
                            "opt-4": "Опция 4",
                            "opt-5": "Опция 5"
                        }}/>
            </Field>
            <Field title="Мультиселект">
                <Select multiple
                        search
                        showCodes
                        pickAllCheckbox
                        maxValues={3}
                        placeholder="...placeholder..."
                        bind:value={values.multiselect}
                        options={{
                            "opt-1": "Опция 1",
                            "opt-2": "Опция 2",
                            "opt-3": "Опция 3",
                            "opt-4": "Опция 4",
                            "opt-5": "Опция 5"
                        }}/>
            </Field>
        </Section>

        values: {JSON.stringify(values)}
    </Form>
</Template>