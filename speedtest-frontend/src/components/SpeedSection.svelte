<script lang="ts">
    async function getStats() {
        let results = {
            "last": 1.1,
            "avg": 5.1,
            "max": 3.1
        }
        return results
    }
    let statsPromise = getStats();

</script>

<style lang="postcss">
    .speed-section {
        display: flex;
        gap: 2rem
        margin-bottom: 2rem;
        align-items: center;
        margin-top: 5rem
    }

</style>

<main>
    <div class="speed-section">
        <div class="graph">
            Download Graph (Placeholder)
        </div>
        <div class="stats">
            {#await statsPromise}
            <p>Loading Stats...</p>
            {:then stats}
            {#each Object.entries(stats) as [key, value]}
            <div class="stat-box">
                {key}: {value}
            </div>
            {/each}
            {/await}
        </div>
    </div>

</main>