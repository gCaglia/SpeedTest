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

  async function getPing() {
    ping = [];
    for (let i = 0; i < 30; i++) {
      ping.push(await speedTest.ping());
    }
  }

  async function getDownloadSpeed() {
    downloadSpeed = [];
    for (let i = 0; i < 30; i++) {
      downloadSpeed.push(await speedTest.download());
    }
  }

  async function getUploadSpeed() {
    uploadSpeed = [];
    for (let i = 0; i < 30; i++) {
      uploadSpeed.push(await speedTest.upload());
    }
  }

  async function runTests() {
    await getPing();
    await getDownloadSpeed();
    await getUploadSpeed();
  }

</script>

<main>
  <div class="heading-box">
    <h1> Welcome to the Private SpeedTest!</h1>
  </div>
  <div class="results">
    <SpeedSection bind:results = {downloadSpeed}></SpeedSection>
    <SpeedSection bind:results = {uploadSpeed}></SpeedSection>
    <PingBox bind:results = {ping}></PingBox>
  </div>
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
