import {ChartConfig, LineChartConfig} from "./types"
import {registerTypeIfNone} from "./registrator"
import {Chart, ChartConfiguration, ChartDataset} from "chart.js"

export class SimpleChart {
    constructor(
        public  configs: ChartConfig[],
        private matrix : Matrix,
        private canvas : HTMLCanvasElement
    ) {
        configs.forEach(config => registerTypeIfNone(config.type))

        new Chart(canvas, {
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
            }
        } as ChartConfiguration);
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
                const fill = config.fill == undefined ? true : config.fill
                dataset = {
                    ...dataset,
                    type: config.type,
                    fill,
                    borderColor: config.palette?.map(rgba => rgbaToString(rgba)),
                    backgroundColor: config.palette?.map(rgba => rgbaToString([...rgba.slice(0, 3), rgba[3] * (fill ? 0.7 : 0)] as RGBA)),
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
        borderWidth: config.dash ? 2 : 1,
        borderDash: config.dash ? [4, 4] : undefined
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