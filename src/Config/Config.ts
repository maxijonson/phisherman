import fs from "fs-extra";
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

    constructor(path: string, options?: ConfigOptions) {
        if (!fs.existsSync(path)) {
            throw new Error(`Config file not found at ${path}`);
        }
        const {
            baseUrl,
            endpoints,
            iterations = 100,
        } = configSchema.parse(fs.readJSONSync(path));

        this.baseUrl = baseUrl;
        this.endpoints = endpoints;
        this.iterations = options?.iterations ?? iterations;
    }
}

export default Config;
