import {ChartType} from "chart.js"

export interface ChartConfig {
    type: ChartType
    palette?: string | string[]
    fill?: boolean
}