import {SpeedTest} from "./Speedtest"

export class DownloadTest extends SpeedTest {
    load_size: number = 10; // 10 MB will be loaded by the endpoint

    constructor(endpoint: string) {
        super(endpoint)
    }

    async runTest(): Promise<number> {
        const start = performance.now();
        await fetch(this.endpoint);
        const end = performance.now();
        const duration = end - start;
        let speed = (this.load_size * 8) / (duration / 1000);
        return speed
    }
}