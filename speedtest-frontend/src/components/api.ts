export class Api {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

    async ping(): Promise<Response> {
        const url = `${this.endpoint}/ping`;
        return await fetch(url);
    }

    async download(size: number): Promise<Response> {
        const url = `${this.endpoint}/download?size=${size}`;
        return await fetch(url)
    }

    async upload(payload: Uint8Array): Promise<Response> {
        const url = `${this.endpoint}/upload`;
        return await fetch(
            url, {
                method: "POST",
                headers: {"Content-Type": "application/octet-stream"},
                body: payload
            }
        )
    }
}