<script lang="ts">
    import ChartResults from "./ChartResults.svelte"

    export let results: number[] | null;
    export let label: string;
    const keys: string[] = ["Last", "Average", "Peak"];
    let statsPromise: Promise<Record<string, number>>;

    async function getAverage(results: number[]): Promise<number> {
        if (Number.length === 0) {
            return NaN
        }
        const sum = results.reduce((a, b) => a + b, 0)
        return sum / results.length
    }

    async function calcStats() {
        let stats: Record<string, number> = {};
        stats["Last"] = results[results.length - 1]
        stats["Average"] = await getAverage(results)
        stats["Peak"] = Math.max(...results)

        return stats
    }

    $: if (results !== null) {
        statsPromise = calcStats();
        } else {
            statsPromise = (async () => {return {}})();
        }
</script>

<style lang="postcss">
    .speed-section {
        display: flex;
        gap: 2rem
        margin-bottom: 2rem;
        align-items: center;
        margin-top: 5rem;
    }
    .stats {
        display: flex;
        margin: 1rem;
        flex-direction: column;
        gap: 1rem;
        background-color: antiquewhite;
        color: black;
        border-radius: 15px;
        padding: 1rem;
    }
    .stat-header {
        font-size: 1.5rem;
        font-weight: bold;
    }
    .stat-result {
        font-size: 1.1rem;
    }
    .graph {
        height: 12.5rem;
        width: 25rem;
    }

</style>

<main>
    <div class="speed-section">
        <div class="graph">
            <ChartResults bind:results={results} bind:label={label}/>
        </div>
        <div class="stats">
            {#each keys as key}
            <div class="stat-box">
                <div class="stat-header">{key}</div>
                {#await statsPromise}
                    <div class="stat-result"> - </div>
                {:then stats}
                    {#if stats.hasOwnProperty(key)}
                        <div class="stat-result"> {stats[key].toFixed(2)} MB/s </div>
                    {:else}
                        <div class="stat-result"> {stats[key]} - </div>
                    {/if}
                {/await}
            </div>
            {/each}
        </div>
    </div>

</main>