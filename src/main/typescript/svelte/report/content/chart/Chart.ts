import {ChartConfig} from "./types"
import {registerTypeIfNone} from "./registrator"
import {Chart} from "chart.js";

export class SimpleChart {
    constructor(
        public  config: ChartConfig,
        matrix: Matrix,
        canvas : HTMLCanvasElement
    ) {
        registerTypeIfNone(config.type)

        new Chart(canvas, {
            data: {
                labels: matrix.data.map(row => row[0]),
                datasets: matrix.data
                    .filter((_, i) => i != 0)
                    .map((data, index) => {
                    return {
                        type: config.type,
                        label: matrix.head[index],
                        data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)'
                        ],
                        borderWidth: 1
                    }
                })
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}