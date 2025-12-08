<script lang="ts">
    import {SimpleChart} from "./Chart"
    import {ChartConfig} from "./types"

    export let
        config: ChartConfig,
        matrix: Matrix

    let canvas: HTMLCanvasElement,
        chart: SimpleChart

    $: canvas && config && matrix && (chart = new SimpleChart(config, matrix, canvas))

</script>

<div class="chart">
    <p>

    </p>

    <canvas bind:this={canvas}/>

</div>

<style>
    .chart {
        display: flex;
        flex-direction: column;
        gap: var(--indent);
        width: 100%;
        height: 100%;
        border: var(--light-border);
        border-radius: var(--border-radius);
    }
    .chart > p {
        padding: 0;
        margin: 0;
    }
    .chart > canvas{
        height: 100%;
        max-height: 90vh;
        max-width: 100%;
    }
    .chart > .actions{
        display: flex;
        margin-top: auto;
        padding: var(--indent);
        border-top: var(--light-border);
        justify-content: space-between;
    }

    .chart :is(.graph-views, .graph-view) {
        display: flex;
        gap: var(--indent);
    }

    .chart .graph-views {
        flex-wrap: wrap;
        padding: 0 var(--indent);
    }

    .chart .graph-view > span {
        align-content: center;
        font-size: large;
        padding: 0 var(--strong-indent);
        background: var(--solid-color);
    }
</style>