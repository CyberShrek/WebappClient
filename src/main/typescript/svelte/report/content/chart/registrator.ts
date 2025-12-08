import {
    Chart,
    LineController,
    LineElement,
    PointElement,
    BarController,
    BarElement,
    DoughnutController,
    PieController,
    BubbleController,
    RadarController,
    PolarAreaController,
    ScatterController,
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    ArcElement, ChartType,
    registerables
} from 'chart.js'

Chart.register(...registerables)

const registeredTypes: Set<ChartType> = new Set()
export function registerTypeIfNone(type: ChartType) {
    // if (registeredTypes.has(type))
    //     return
    //
    // switch (type) {
    //     case "line"     : registerLine();       break
    //     case "bar"      : registerBar();        break
    //     case "doughnut" : registerDoughnut();   break
    //     case "pie"      : registerPie();        break
    //     case "bubble"   : registerBubble();     break
    //     case "radar"    : registerRadar();      break
    //     case "polarArea": registerPolarArea();  break
    //     case "scatter"  : registerScatter()
    // }
    //
    // registeredTypes.add(type)
}

function registerLine() {
    Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale)
}

function registerBar() {
    Chart.register(BarController, BarElement, CategoryScale, LinearScale)
}

function registerDoughnut() {
    Chart.register(DoughnutController, ArcElement)
}

function registerPie() {
    Chart.register(PieController, ArcElement)
}

function registerBubble() {
    Chart.register(BubbleController, PointElement, LinearScale)
}

function registerRadar() {
    Chart.register(RadarController, LineElement, PointElement, RadialLinearScale, LinearScale)
}

function registerPolarArea() {
    Chart.register(PolarAreaController, ArcElement, RadialLinearScale)
}

function registerScatter() {
    Chart.register(ScatterController, PointElement, LinearScale)
}