import { ConfigModel, configSchema, Endpoint } from "./schema";

class Config {
    public readonly baseUrl: ConfigModel["baseUrl"];
    public readonly iterations: ConfigModel["iterations"];
    public readonly concurrency: ConfigModel["concurrency"];
    public readonly endpoints: Endpoint[];

    constructor(configObject: ConfigModel | object) {
        const { baseUrl, endpoints, iterations, concurrency } =
            configSchema.parse(configObject);

        this.baseUrl = baseUrl;
        this.endpoints = endpoints;
        this.iterations = iterations;
        this.concurrency = concurrency;
    }
}

export default Config;
