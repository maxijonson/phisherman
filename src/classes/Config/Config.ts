import fs from "fs-extra";
import { ConfigModel, configSchema } from "./schema";

class Config {
    private readonly baseUrl: ConfigModel["baseUrl"];
    private readonly endpoints: ConfigModel["endpoints"];

    constructor(path: string) {
        if (!fs.existsSync(path)) {
            throw new Error(`Config file not found at ${path}`);
        }
        const { baseUrl, endpoints } = configSchema.parse(
            fs.readJSONSync(path)
        );
        this.baseUrl = baseUrl;
        this.endpoints = endpoints;
    }
}

export default Config;
