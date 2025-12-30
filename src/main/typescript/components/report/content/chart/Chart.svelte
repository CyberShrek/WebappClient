<script lang="ts">
    import {SimpleChart} from "./Chart"
    import {ChartConfig} from "./types"
    import {onDestroy} from "svelte";

    export let
        title: string = "",
        configs: ChartConfig[],
        matrix: Matrix

    export const exportCallback: () => ExportableImage = () => {
        return {
            type: "image",
            title,
            base64: canvas.toDataURL('image/png', 1).replace("data:image/png;base64,", "")
        }
    }
    let canvas: HTMLCanvasElement,
        chart: SimpleChart

    $: if (configs && matrix && canvas) {
        if (chart) chart.destroy()
        chart = new SimpleChart(configs, matrix, canvas)
    }

    onDestroy(() => chart?.destroy())

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
        border: var(--light-border);
        border-radius: var(--border-radius);
        padding: var(--indent) var(--light-indent) var(--light-indent);
    }
    .chart > p {
        padding: 0 var(--indent);
        margin: 0;
        text-align: center;
    }
    .chart > canvas{
        height: 100%;
        max-height: 90vh;
        max-width: 100%;
    }
</style>