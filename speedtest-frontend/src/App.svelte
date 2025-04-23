<script lang="ts">
  let pingMs: number | null = null;

  async function getPing() {
    const start = performance.now();

    try {
      await fetch("http://localhost:3000/ping");
      const end = performance.now();
      pingMs = end - start;
    } catch (error) {
      pingMs = null;
      console.log("Ping failed", error);
    }
  }
</script>

<main>
  <h1>Welcome to the Private SpeedTest!</h1>
  <button on:click={getPing}> Test Ping </button>
  {#if pingMs !== null}
    <p>Your ping is: {pingMs.toFixed(2)} ms</p>
  {/if}
</main>

<style lang="postcss">
  @reference "tailwindcss";
</style>
