<script lang="ts">
    import Template from "../main/typescript/svelte/index/Template.svelte"
    import Form from "../main/typescript/svelte/form/Form.svelte"
    import Section from "../main/typescript/svelte/form/Section.svelte"
    import Field from "../main/typescript/svelte/form/Field.svelte"
    import Calendar from "../main/typescript/svelte/input/Calendar.svelte"
    import Select from "../main/typescript/svelte/input/Select.svelte"
    import Switch from "../main/typescript/svelte/input/Switch.svelte"
    import Button from "../main/typescript/svelte/input/Button.svelte"
    import Report from "../main/typescript/svelte/report/Report.svelte"
    import ContentBlock from "../main/typescript/svelte/report/content/ContentBlock.svelte";
    import Table from "../main/typescript/svelte/report/content/table_new/Table.svelte";
    const appInfo: AppInfo = {
        code: "debug"
    }

    let values: {
        [fieldId: string]: any
    } = {}

    $: message = values.switch ? "Какое-то сообщение" : ''

    function generateRandomData(
        height: number,
        columnTypes: ('string' | 'number' | 'boolean')[]
    ): any[][] {
        const width = columnTypes.length;
        const WORDS = [
            'apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape',
            'honeydew', 'kiwi', 'lemon', 'mango', 'nectarine', 'orange', 'peach',
            'quince', 'raspberry', 'strawberry', 'tangerine', 'watermelon'
        ];

        const result: any[][] = [];

        for (let i = 0; i < height; i++) {
            const row: any[] = [];

            for (let j = 0; j < width; j++) {
                const columnType = columnTypes[j] || 'string';

                switch (columnType) {
                    case 'string':
                        row.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
                        break;
                    case 'number':
                        row.push(Math.floor(Math.random() * 1000)/10);
                        break;
                    case 'boolean':
                        row.push(Math.random() > 0.5);
                        break;
                    default:
                        row.push(null);
                }
            }

            result.push(row);
        }

        return result;
    }

    const randomData = generateRandomData(500, ["string", "string", "number", "boolean"]).sort(
        (a, b) => a[0].localeCompare(b[0]) || a[1].localeCompare(b[1])
    );

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
        <ContentBlock>
            <Table head={["Столбец 1", "Столбец 2", "Столбец 3", "Столбец 4"]}
                   data={randomData}
                   chunking="collapsable"
                   addTotals>
                <slot slot="cell"
                      let:type
                      let:value>
                    {value} : {type}
                </slot>
            </Table>
        </ContentBlock>
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