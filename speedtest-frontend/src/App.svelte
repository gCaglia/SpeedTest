<script lang="ts">
  import { SpeedTest } from "./components/SpeedTest";
  import { Api } from "./components/api";
  import SpeedSection from "./components/SpeedSection.svelte";
  import PingBox from "./components/PingBox.svelte";

  let api = new Api("http://localhost:3000");
  let speedTest = new SpeedTest(api);

  let ping: number[] | null = null;
  let downloadSpeed: number[] | null = null;
  let uploadSpeed: number[] | null = null;
  let speedTestRunning: boolean = false;
  
  const numChecks: number = 30;
  const maxPayloadSize: number = 25e6; // 25 MB -> Large enough for fast connections
  const startPayloadSize: number = 100e3; // 100 KB

  async function getPing() {
    let results: number[] = [];
    for (let i = 0; i < numChecks; i++) {
      results.push(await speedTest.ping());
    }
    return results
  }

  async function getDownloadSpeed() {
    let results: number[] = [];
    let result: number;
    let size: number = startPayloadSize;
    for (let i = 0; i <= numChecks; i++) {
      result = await speedTest.download(size);
      size = Math.min(await getNewSize(1, result), maxPayloadSize);
      results.push(result);
    }
    return results.slice(1); // Ignore first measurement
  }

  async function getNewSize(duration_target: number, velocity_current: number): Promise<number> {
    return Math.round(duration_target * velocity_current * 1e6) // Convert here MB/s to B/s
  }

  async function getUploadSpeed() {
    let results: number[] = [];
    let result: number;
    let size: number = 100;
    for (let i = 0; i <= numChecks; i++) {
      result = await speedTest.upload(size);
      size = Math.min(await getNewSize(1, result), maxPayloadSize); // Max payload size is 100MB
      results.push(result);
    }
    return results.slice(1);
  }

  async function runTests() {
    speedTestRunning = true;
    try {
      ping = [];
      downloadSpeed = [];
      uploadSpeed = [];
      ping = await getPing();
      downloadSpeed = await getDownloadSpeed();
      uploadSpeed = await getUploadSpeed();
    } finally {
      speedTestRunning = false;
    }
  }

</script>

<main>
  <div class="heading-box">
    <h1> Welcome to the Private SpeedTest!</h1>
  </div>
  <div class="results">
    <SpeedSection bind:results = {downloadSpeed} label = "Download Speed (MB/s)"></SpeedSection>
    <SpeedSection bind:results = {uploadSpeed} label = "Upload Speed (MB/s)"></SpeedSection>
  </div>
  <div class="results">
    <PingBox bind:results = {ping}></PingBox>
  </div>
  <button class="test-button" on:click={runTests} disabled={speedTestRunning}>
    {#if speedTestRunning}
    <span class="spinner"></span> Running...
    {:else}
    Run Test
    {/if}
  </button>
</main>

<style lang="postcss">
  @reference "tailwindcss";
  .heading-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    justify-content: center;
    width: 100%
  }

  .results {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .spinner {
    border: 2px solid #f3f3f3;
    border-top: 2px solid #3498db;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    animation: spin 1s linear infinite;
    display: inline-block;
    margin-right: 8px;
    vertical-align: middle;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
