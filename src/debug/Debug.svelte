<script lang="ts">
    import Template from "../main/typescript/svelte/index/Template.svelte"
    import Form from "../main/typescript/svelte/form/Form.svelte"
    import Section from "../main/typescript/svelte/form/Section.svelte"
    import Field from "../main/typescript/svelte/form/Field.svelte"
    import Calendar from "../main/typescript/svelte/input/Calendar.svelte"
    import Select from "../main/typescript/svelte/input/Select.svelte"
    import Switch from "../main/typescript/svelte/input/Switch.svelte";
    import Button from "../main/typescript/svelte/input/Button.svelte";
    import Report from "../main/typescript/svelte/report/Report.svelte";
    import Image from "../main/typescript/svelte/misc/Image.svelte";

    const appInfo: AppInfo = {
        code: "debug"
    }

    let values: {
        [fieldId: string]: any
    } = {}

    $: message = values.switch ? "Какое-то сообщение" : ''

</script>

<Template {appInfo}>
    <Form {values}>
        <Section title="Какая-то секция" area={3}>
            <Field title="Календарь"
                   hint="Информация">
                <Calendar bind:value={values.calendar}/>
            </Field>
            <Field title="Календарь с диапазоном"
                   {message}>
                <Calendar bind:value={values.rangedCalendar}
                          range={10}/>
            </Field>

            <Field title="Cелект" isWrong>
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
            <Field hint="Информация">
                <Switch title="Переключатель"

                        bind:value={values.switch}/>
            </Field>
        </Section>

<!--        values: {JSON.stringify(values)}-->
    </Form>

    <Report title="Отчёт">
        <Image image="https://i.pinimg.com/originals/60/9f/79/609f79c036f54c4564ab72e0f89df98f.gif"/>
    </Report>

    <div>

        <Button size="small"
                text="small"/>

        <Button size="medium"
                text="medium"/>

        <Button size="large"
                text="large"/>

    </div>
</Template>