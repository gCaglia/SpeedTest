import { Api } from "./api";

export class SpeedTest {
    api: Api;
    payload_size = 10*1000**2; // 10 MB

    constructor(api: Api) {
        this.api = api
    }

    async ping(): Promise<number | null> {
        const start = performance.now();
        const response = await this.api.ping();
        const end = performance.now();
        if (response.ok) {
            const response_time = end - start;
            return response_time
        }
        console.log("Error getting response!");
        return null;
    }

    async download(): Promise<number | null> {
        const start = performance.now();
        const response = await this.api.download();
        const end = performance.now();
        if (response.ok) {
            const payload_size_header = response.headers.get("Content-Length");
            const bytes = parseInt(payload_size_header, 10);
            const durationSecs = (end - start) / 1000; // Milliseconds
            const bytes_per_second = bytes / durationSecs;
            const mb_per_second = bytes_per_second / (1024**2);
            return mb_per_second
        }
        console.log("Error getting response!");
        return null;
    }

    async upload(): Promise<number | null> {
        const empty_payload = new Uint8Array(this.payload_size);
        const payload = await this.fillPayload(empty_payload);
        const start = performance.now();
        const response = await this.api.upload(payload);
        const end = performance.now();
        if (response.ok) {
            const durationSecs = (end - start) / 1000;
            const mb_per_second = (this.payload_size / durationSecs) / 1024**2;
            return mb_per_second
        }
        console.log("Error getting response!")
        return null
    }

    private async fillPayload(payload: Uint8Array): Promise<Uint8Array> {
        const chunksize: number = 65536;
        for (let i = 0; i < payload.length; i+= chunksize) {
            const end = Math.min(i + chunksize, payload.length)
            crypto.getRandomValues(payload.subarray(i, end))
        }

        return payload

    }
}
