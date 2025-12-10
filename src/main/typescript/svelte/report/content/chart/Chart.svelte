<script lang="ts">
    import {SimpleChart} from "./Chart"
    import {ChartConfig} from "./types"

    export let
        title: string = "",
        configs: ChartConfig[],
        matrix: Matrix

    let canvas: HTMLCanvasElement,
        chart: SimpleChart

    $: canvas && configs && matrix && (chart = new SimpleChart(configs, matrix, canvas))

</script>

<div class="chart">
    {#if title.length > 0}
        <p>
            {title}
        </p>
    {/if}

    <canvas bind:this={canvas}/>

</div>

<style>
    .chart {
        display: flex;
        flex-direction: column;
        gap: var(--indent);
        /*width: 100%;*/
        /*height: 100%;*/
        border: var(--light-border);
        border-radius: var(--border-radius);
    }
    .chart > p {
        padding: var(--light-indent) var(--indent);
        margin: 0;
    }
    .chart > canvas{
        height: 100%;
        max-height: 90vh;
        max-width: 100%;
    }
</style>