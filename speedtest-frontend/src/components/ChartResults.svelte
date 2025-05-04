<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { Chart, type ChartConfiguration, registerables } from 'chart.js';

    export let results: number[] | null;
    export let label: string;

    let chart: Chart | null = null;
    let canvas: HTMLCanvasElement;

    function enumerate(len: number): number[] {
        return Array.from({length: len}, (_, i) => i)
    }

    Chart.register(...registerables);
    let xticks: number[] = enumerate(30);

    let data = {
        labels: xticks,
        datasets: [
            {
                label: label,
                data: results ?? [],
                backgroundColor: ['blue']
            }
        ]
    };

    const config: ChartConfiguration = {
        type: 'bar',
        data
    };

    onMount(() => {chart = new Chart(canvas, config)});
    onDestroy(() => {chart?.destroy()});

    $: if (chart && results !== null) {
        chart.data.labels = enumerate(results.length);
        chart.data.datasets[0].data = results;
        chart.data.datasets[0].label = label;
        chart.update();
    }
</script>

<canvas bind:this={canvas}></canvas>