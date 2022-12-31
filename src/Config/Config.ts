import { ConfigModel, configSchema, Endpoint } from "./schema";

interface ConfigOptions {
    /**
     * The number of times to run the spammer. This overrides the value in the config file, if present.
     */
    iterations?: number;
}

class Config {
    public readonly baseUrl: ConfigModel["baseUrl"];
    public readonly iterations: ConfigModel["iterations"];
    public readonly endpoints: Endpoint[];

    constructor(configObject: ConfigModel | object, options?: ConfigOptions) {
        const { baseUrl, endpoints, iterations } =
            configSchema.parse(configObject);

        this.baseUrl = baseUrl;
        this.endpoints = endpoints;
        this.iterations = options?.iterations ?? iterations;
    }
}

export default Config;
