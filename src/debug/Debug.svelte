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
    import ContentBlock from "../main/typescript/svelte/report/content/ContentBlock.svelte"
    import Table from "../main/typescript/svelte/report/content/table_new/Table.svelte"

    const appInfo: AppInfo = {
        code: "debug"
    }

    let values: {
        [fieldId: string]: any
    } = {}

    let checkedData: (string | number | boolean | null)[][] = []

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

    const matrix: Matrix = {
        head: ["Ключи|Столбец 1", "Ключи|Столбец 2", "Ключи|Столбец 3", "Значения|Столбец 4", "Значения|Столбец 5", "Столбец 6"],
        data: generateRandomData(100, ["string", "string", "string", "number", "number", "boolean"]).sort(
            (a, b) => a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]) || a[2].localeCompare(b[2]))
    }

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
                        bind:checked={values.switch}/>
            </Field>
        </Section>

    </Form>

    <Report title="Отчёт">
        <ContentBlock>
            <Table {matrix}
                   config={{
                       chunking: null,
                       addOperations: true,
                       addCheckboxes: true,
                       addTotal: true}}
                   on:select={(event) => console.log(event.detail)}>
                <slot slot="cell" let:cell>
                    {cell.value}
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