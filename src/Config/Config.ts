import { ConfigModel, configSchema } from "./schema";

interface ConfigOptions {
    /**
     * The number of times to run the spammer. This overrides the value in the config file, if present.
     */
    iterations?: number;
}

class Config {
    public readonly baseUrl: ConfigModel["baseUrl"];
    public readonly endpoints: ConfigModel["endpoints"];
    public readonly iterations: ConfigModel["iterations"];

    constructor(configObject: ConfigModel | object, options?: ConfigOptions) {
        const {
            baseUrl,
            endpoints,
            iterations = 100,
        } = configSchema.parse(configObject);

        this.baseUrl = baseUrl;
        this.endpoints = endpoints;
        this.iterations = options?.iterations ?? iterations;
    }
}

export default Config;
