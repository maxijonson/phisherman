import { ConfigModel, configSchema, Endpoint } from "./schema";

class Config {
    public readonly baseUrl: ConfigModel["baseUrl"];
    public readonly iterations: ConfigModel["iterations"];
    public readonly endpoints: Endpoint[];

    constructor(configObject: ConfigModel | object) {
        const { baseUrl, endpoints, iterations } =
            configSchema.parse(configObject);

        this.baseUrl = baseUrl;
        this.endpoints = endpoints;
        this.iterations = iterations;
    }
}

export default Config;
