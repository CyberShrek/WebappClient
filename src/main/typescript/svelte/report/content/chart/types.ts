import {ChartType} from "chart.js"

export type ChartConfig =
    LineChartConfig |
    BarChartConfig |
    DoughnutChartConfig |
    PieChartConfig |
    ScatterChartConfig |
    BubbleChartConfig |
    RadarChartConfig |
    PolarAreaChartConfig

interface CommonChartConfig extends ChartConfig {
    type: ChartType
    palette?: RGBA[]
    fill?: boolean
}

export interface LineChartConfig extends CommonChartConfig {
    type: "line"
    dash?: boolean
}

export interface BarChartConfig extends CommonChartConfig {
    type: "bar"
}

export interface DoughnutChartConfig extends CommonChartConfig {
    type: "doughnut"
}

export interface PieChartConfig extends CommonChartConfig {
    type: "pie"
}

export interface ScatterChartConfig extends CommonChartConfig {
    type: "scatter"
}

export interface BubbleChartConfig extends CommonChartConfig {
    type: "bubble"
}

export interface RadarChartConfig extends CommonChartConfig {
    type: "radar"
}

export interface PolarAreaChartConfig extends CommonChartConfig {
    type: "polarArea"
}

export type RGBA = [number, number, number, number]