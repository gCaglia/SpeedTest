<script lang="ts">
  import { SpeedTest } from "./components/SpeedTest";
  import { Api } from "./components/api";

  let api = new Api("http://localhost:3000");
  let speedTest = new SpeedTest(api);

  let ping: number | null = null;
  let downloadSpeed: number | null = null;
  let uploadSpeed: number | null = null;

  async function getPing() {
    ping = await speedTest.ping();
  }

  async function getDownloadSpeed() {
    downloadSpeed = await speedTest.download();
  }

  async function getUploadSpeed() {
    uploadSpeed = await speedTest.upload()
  }
</script>

<main>
  <h1>Welcome to the Private SpeedTest!</h1>
  <button on:click={getPing}>Test Ping </button>
  {#if ping !== null}
    <p>Your ping is: {ping.toFixed(2)} ms</p>
  {/if}
  <button on:click={getDownloadSpeed}>Test Download Speed</button>
  {#if downloadSpeed !== null}
    <p>Your download speed is: {downloadSpeed.toFixed(2)} MB/s.</p>
  {/if}
  <button on:click={getUploadSpeed}>Test Upload Speed</button>
  {#if uploadSpeed !== null}
    <p>Your upload speed is: {uploadSpeed.toFixed(2)} MB/s.</p>
  {/if}
</main>

<style lang="postcss">
  @reference "tailwindcss";
</style>
