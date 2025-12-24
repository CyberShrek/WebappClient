import {ChartConfig, LineChartConfig} from "./types"
import {registerTypeIfNone} from "./registrator"
import {Chart, ChartConfiguration, ChartDataset} from "chart.js"
import Decimal from 'decimal.js';

export class SimpleChart {

    private chartJS: Chart

    constructor(
        public  configs: ChartConfig[],
        private matrix : Matrix,
        private canvas : HTMLCanvasElement
    ) {
        configs.forEach(config => registerTypeIfNone(config.type))

        matrix.data = aggregateData(matrix.data)

        this.chartJS = new Chart(canvas, {
            type: configs[0].type,
            data: {
                labels: matrix.data.map(row => row[0]),
                datasets: this.buildDatasets()
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            },
            backgroundColor: "white"
        } as ChartConfiguration);
    }

    destroy() {
        this.chartJS.destroy()
    }

    private buildDatasets(): ChartDataset[] {

        const datasets: ChartDataset[] = []

        for (let i = 1; i < this.matrix.head.length; i++) {
            let dataset = {
                label: this.matrix.head[i],
                data: this.matrix.data.map(row => row[i]),
                borderWidth: 1
            } as ChartDataset

            let config = this.configs[i - 1]
            if (config) {
                const fill = config.fill == undefined ? false : config.fill
                dataset = {
                    ...dataset,
                    type: config.type,
                    fill,
                    borderColor: config.palette?.map(rgba => rgbaToString(rgba)),
                    backgroundColor: config.palette?.map(rgba => rgbaToString([...rgba.slice(0, 3), rgba[3] * (fill ? 0.5 : 0)] as RGBA)),
                    ...getSpecialProperties(config)

                } as ChartDataset
            }

            datasets.push(dataset)
        }

        return datasets
    }
}

function getSpecialProperties(config: ChartConfig) {
    switch (config.type) {
        case "line": return getLineProperties(config)
        case "bar" : return getBarProperties()
    }
    return {}
}

function getLineProperties(config: LineChartConfig) {
    return {
        borderWidth: 3,
        borderDash: config.dash ? [6, 6] : undefined
    } as
        ChartDataset
}

function getBarProperties() {
    return {
        borderRadius: 6
    } as
        ChartDataset
}

function rgbaToString(rgba: RGBA): string {
    return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`
}

function aggregateData(data: MatrixData): MatrixData {
    const result = new Map<string, Decimal[]>();

    for (const row of data) {
        const key = String(row[0]);
        const sums: Decimal[] = result.get(key) || row.slice(1).map(() => new Decimal(0));

        row.slice(1).forEach((val, i) => {
            sums[i] = sums[i].add(new Decimal(val as number));
        });

        result.set(key, sums);
    }

    return Array.from(result.entries(), ([key, sums]) => [
        key,
        ...sums.map(s => s.toNumber())
    ]);
}