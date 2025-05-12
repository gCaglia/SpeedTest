import { Api } from "./api";

export class SpeedTest {
    api: Api;

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

    async download(size: number): Promise<number | null> {
        let totalBytes = 0;
        const start = performance.now();
        const response = await this.api.download(size);
        const reader = await response.body.getReader()
        while (true) {
            const { done, } = await reader.read()
            if (done) break;
        }
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

    async upload(size: number): Promise<number | null> {
        const empty_payload = new Uint8Array(size);
        const payload = await this.fillPayload(empty_payload);
        const start = performance.now();
        const response = await this.api.upload(payload);
        const end = performance.now();
        if (response.ok) {
            const durationSecs = (end - start) / 1000;
            const mb_per_second = (size / durationSecs) / 1024**2;
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
