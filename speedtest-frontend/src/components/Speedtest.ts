export abstract class SpeedTest {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

    abstract runTest(): Promise<number>;
}