<script lang="ts">
    export let results: number[] | null

    async function getMean(): Promise<number> {
        if (results.length === 0 ) {
            return NaN
        }
        const sum = results.reduce((a, b) => a + b, 0)
        return sum  / results.length;
    }

    let meanPing: Promise<number> = getMean();
</script>

<style lang="postcss">
    .ping-box {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10rem;
        flex-direction: column;
    }

    .ping-header {
        font-size: 2em;
        font-weight: bold;
        margin: 1rem
    }

    .ping-result {
        font-size: 1.5em;
        background-color: rgb(79, 92, 92);
        padding: 1rem
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
            {/if}
            {#await meanPing}
            Loading ping...
            {:then ping}
            {{ping}} ms
            {/await}
        </div>
    </div>
</main>