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
  
  const numChecks: number = 30;

  async function getPing() {
    let results: number[] = [];
    for (let i = 0; i < numChecks; i++) {
      results.push(await speedTest.ping());
    }
    return results
  }

  async function getDownloadSpeed() {
    let results: number[] = [];
    for (let i = 0; i < numChecks; i++) {
      results.push(await speedTest.download());
    }
    return results
  }

  async function getUploadSpeed() {
    let results: number[] = [];
    for (let i = 0; i < numChecks; i++) {
      results.push(await speedTest.upload());
    }
    return results
  }

  async function runTests() {
    ping = null;
    downloadSpeed = null;
    uploadSpeed = null;
    ping = await getPing();
    downloadSpeed = await getDownloadSpeed();
    uploadSpeed = await getUploadSpeed();
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
  <button class="test-button" on:click={runTests}>
    Run Test
  </button>
</main>

<style lang="postcss">
  @reference "tailwindcss";
  .heading-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%
  }

  .results {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
</style>
