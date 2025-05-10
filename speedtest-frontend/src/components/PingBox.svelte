<script lang="ts">
    export let results: number[] | null
    let meanPing: Promise<number>;

    async function getMean(): Promise<number> {
        if (results.length === 0) {
            return NaN
        }
        const sum = results.reduce((a, b) => a + b, 0)
        return sum  / results.length;
    }

    $: if (results !== null) {
        meanPing = getMean()
    }
</script>

<style lang="postcss">
    .ping-box {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10rem;
        flex-direction: column;
        margin-bottom: 5rem;
        margin-top: 5rem;
    }

    .ping-header {
        font-size: 2em;
        font-weight: bold;
        margin: 1rem
    }

    .ping-result {
        font-size: 1.5em;
        background-color: rgb(79, 92, 92);
        padding: 1rem;
    }
</style>

<main>
    <div class="ping-box">
        <div class="ping-header">
            Ping
        </div>
        <div class="ping-result">
            {#if results === null}
                -
            {:else}
            {#await meanPing}
                Loading ping...
            {:then ping}
                {#if Number.isNaN(ping)}
                    Loading ping...
                {:else}
                    {ping.toFixed(2)} ms
                {/if}
            {/await}
            {/if}
        </div>
    </div>
</main>