<script lang="ts">
    import Index from "../main/typescript/svelte/index/Index.svelte"
    import Form from "../main/typescript/svelte/form/Form.svelte"
    import Section from "../main/typescript/svelte/form/Section.svelte"
    import Field from "../main/typescript/svelte/form/Field.svelte"
    import Calendar from "../main/typescript/svelte/input/Calendar.svelte"
    import Select from "../main/typescript/svelte/input/Select.svelte"
    import Switch from "../main/typescript/svelte/input/Switch.svelte"
    import Button from "../main/typescript/svelte/input/Button.svelte"
    import Report from "../main/typescript/svelte/report/Report.svelte"
    import ContentBlock from "../main/typescript/svelte/report/content/ContentBlock.svelte"
    import Table from "../main/typescript/svelte/report/content/./table/Table.svelte"
    import Chart from "../main/typescript/svelte/report/content/chart/Chart.svelte"
    import Grid from "../main/typescript/svelte/misc/Grid.svelte"
    import Tile from "../main/typescript/svelte/report/content/tiles/Tile.svelte"
    import image from "../main/resources/img/ruble.svg"
    import {SimpleHttp} from "../main/typescript/api/http/SimpleHttp";
    import {getUserInfo} from "../main/typescript/api/info";
    import {downloadReport} from "../main/typescript/api/report";
    import {serverLocations} from "../main/typescript/properties";
    import {DocumentExport} from "../main/typescript/model/export/DocumentExport";

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

    const tableMatrix: Matrix = {
        head: ["Ключи|Столбец 1", "Ключи|Столбец 2", "Ключи|Столбец 3", "Значения|Столбец 4", "Значения|Столбец 5", "Столбец 6", "some nulls"],
        data: generateRandomData(100, ["string", "string", "string", "number", "number", "boolean"]).sort(
            (a, b) => a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]) || a[2].localeCompare(b[2])).map(row => [...row, undefined])
    }
    const chartMatrix: Matrix = {
        head:                         ["key",    "Label-1", "Label-2", "Label-3"],
        data: generateRandomData(10, ["string", "number",  "number",  "number" ])
    }

    let documentExport: DocumentExport = new DocumentExport("Охуеть! Оно работает!")

    // $: exportCallback && console.log("ExportableTable", exportCallback())
    // $: getExportableCharts && console.log("ExportableChart", getExportableCharts())

</script>

<Index appCode="DEBUG">
    <Form {values}
          {documentExport}>
        <Section title="Какая-то секция" area={3}>
            <Field title="Календарь"
                   hint="Информация">
                <Calendar bind:value={values.calendar}
                          bind:prettifyCallback={documentExport.formValuesCallbacks["0|Какая-то секция|Календарь"]}/>
            </Field>
            <Field title="Календарь с диапазоном"
                   {message}>
                <Calendar bind:value={values.rangedCalendar}
                          range={10}
                          bind:prettifyCallback={documentExport.formValuesCallbacks["1|Какая-то секция|Календарь с диапазоном"]}/>
            </Field>

            <Field title="Cелект" isWrong>
                <Select bind:value={values.select}
                        options={{
                            "opt-1": "Опция 1",
                            "opt-2": "Опция 2",
                            "opt-3": "Опция 3",
                            "opt-4": "Опция 4",
                            "opt-5": "Опция 5"
                        }}
                        bind:prettifyCallback={documentExport.formValuesCallbacks["2|Какая-то секция|Селект"]}/>
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
                        }}
                        bind:prettifyCallback={documentExport.formValuesCallbacks["3|Какая-то секция|Мультиселект"]}/>
            </Field>
            <Field hint="Информация">
                <Switch title="Переключатель"
                        bind:checked={values.switch}
                        bind:prettifyCallback={documentExport.formValuesCallbacks["4|Какая-то секция|Переключатель"]}/>
            </Field>
        </Section>

    </Form>

    <Report title="Отчёт"
            {documentExport}>
<!--        <ContentBlock>-->
<!--            <Grid area={2}>-->
<!--                <Chart  title="График"-->
<!--                        matrix={chartMatrix}-->
<!--                        configs={[-->
<!--                            {-->
<!--                                type: "line",-->
<!--                                dash: true,-->
<!--                                fill: true,-->
<!--                                palette: [-->
<!--                                    [100, 150, 100, 1],-->
<!--                                    [200, 150, 100, 1],-->
<!--                                    [50, 150, 100, 1]-->
<!--                                ]-->
<!--                            },-->
<!--                            {-->
<!--                                type: "bar",-->
<!--                                palette: [-->
<!--                                    [200, 150, 100, 1],-->
<!--                                    [50, 150, 100, 1]-->
<!--                                ]-->
<!--                            },-->
<!--                            {-->
<!--                                type: "pie",-->
<!--                                // fill: false,-->
<!--                                palette: [-->
<!--                                    [200, 150, 100, 1],-->
<!--                                    [50, 150, 100, 1]-->
<!--                                ]-->
<!--                            }-->
<!--                        ]}-->
<!--                        bind:exportCallback={documentExport.reportCallbacks[0]}-->
<!--                />-->
<!--                <Chart  title="График"-->
<!--                        matrix={chartMatrix}-->
<!--                        configs={[{-->
<!--                        type: "line",-->
<!--                        dash: true,-->
<!--                        fill: true,-->
<!--                        palette: [-->
<!--                            [100, 150, 100, 1],-->
<!--                            [200, 150, 100, 1],-->
<!--                            [50, 150, 100, 1]-->
<!--                        ]-->
<!--                    },{-->
<!--                        type: "bar",-->
<!--                        palette: [-->
<!--                            [200, 150, 100, 1],-->
<!--                            [50, 150, 100, 1]-->
<!--                        ]-->
<!--                    },{-->
<!--                        type: "pie",-->
<!--                        // fill: false,-->
<!--                        palette: [-->
<!--                            [200, 150, 100, 1],-->
<!--                            [50, 150, 100, 1]-->
<!--                        ]-->
<!--                    }]}-->
<!--                        bind:exportCallback={documentExport.reportCallbacks[1]}/>-->
<!--            </Grid>-->
<!--        </ContentBlock>-->
        <ContentBlock>
            <Grid area={4}>
                <Tile title="Плитка-1"
                      value={100}
                      label="ед."
                      color="#FFD2C2"
                      {image}/>

                <Tile title="Плитка-2"
                      value={2132132}
                      label="ед."
                      color="#D1F7E8FF"
                      {image}/>

                <Tile title="Плитка-3"
                      value={1044440}
                      label="ед."
                      color="#D2E0FAFF"
                      {image}/>

                <Tile title="Плитка-4"
                      value={876}
                      label="ед."
                      color="#C8C2E4FF"
                      {image}/>
            </Grid>
        </ContentBlock>

        <Table matrix={tableMatrix}
               config={{
               chunking: null,
               pagination: 50,
               addOperations: true,
               addCheckboxes: false,
               addTotal: true}}
               bind:exportCallback={documentExport.reportCallbacks[2]}
               on:select={(event) => console.log(event.detail)}>
            <slot slot="cell" let:cell>
                {cell.value}
            </slot>
            <!--{#if message}-->
            <slot slot="foot">
                $$slots.foot
                <button>213</button>
            </slot>
            <!--{/if}-->
        </Table>

    </Report>

    <div>

        <Button size="small"
                text="small"/>

        <Button size="medium"
                text="medium"/>

        <Button size="large"
                text="large"/>

    </div>
</Index>