<script lang="ts">
    import {DownloadTest} from "./DownloadTest"

    let speed: number | null = null

    async function runTest() {
        let tester = new DownloadTest("http://localhost:3000/download");
        speed = await tester.runTest()
    }
</script>

<main>
    <h2>Download Speed:</h2>
    <button on:click={runTest}>Get Download Speed</button>
    {#if speed !== null}
        <p>Your download speed is: {speed.toFixed(2)} Mbps.</p>
    {/if}
</main>


