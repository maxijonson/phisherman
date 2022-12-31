import "../Template";
import Config from "../Config/Config";
import Identity from "../Identity/Identity";
import axios from "axios";
import chalk from "chalk";
import { ConfigModel } from "../Config/schema";
import Template from "../Template/Template";
import IdentityCounterTemplate from "../Template/IdentityCounter";
import EndpointCounterTemplate from "../Template/EndpointCounter";

class Runner {
    private identities: Identity[] = [];

    constructor(private config: Config) {
        this.generateIdentities();
    }

    private generateIdentities() {
        this.identities = [];
        for (let i = 0; i < this.config.iterations; i++) {
            this.identities.push(new Identity());
        }
    }

    private applyTemplates(obj: object, identity: Identity) {
        const result: { [key: string]: any } = {};

        for (const [key, value] of Object.entries(obj)) {
            const transformedKey = Template.apply(key, identity);
            const transformedValue =
                typeof value === "string"
                    ? Template.apply(value, identity)
                    : value; // TODO: Handle non-string values
            result[transformedKey] = transformedValue;
        }

        return result;
    }

    private getTransformedData(
        data: ConfigModel["endpoints"][number]["data"],
        identity: Identity
    ) {
        const result = this.applyTemplates(data.body, identity);

        switch (data.type) {
            case "form-data":
                const formData = new FormData();
                for (const [key, value] of Object.entries(result)) {
                    formData.append(key, `${value}`);
                }
                return formData;
            case "x-www-form-urlencoded":
                const urlEncoded = new URLSearchParams();
                for (const [key, value] of Object.entries(result)) {
                    urlEncoded.append(key, `${value}`);
                }
                return urlEncoded;
            default:
            case "json":
                return result;
        }
    }

    public async run() {
        for (const identity of this.identities) {
            // TODO: IF spam is made async, this will need to be changed to handle a per-identity counter
            IdentityCounterTemplate.resetCounter();
            for (const endpoint of this.config.endpoints) {
                // TODO: IF spam is made async, this will need to be changed to handle a per-endpoint counter
                EndpointCounterTemplate.resetCounter();

                const url = `${this.config.baseUrl}/${endpoint.path}`;
                const method = endpoint.method.toLowerCase();
                const data = this.getTransformedData(endpoint.data, identity);
                const headers = this.applyTemplates(endpoint.headers, identity);

                try {
                    const response = await axios({
                        url,
                        method,
                        data,
                        headers,
                    });

                    console.info(
                        chalk.green(
                            `✔ ${method.toUpperCase()} ${url} - ${
                                response.status
                            }`
                        )
                    );
                } catch (error) {
                    console.error(error);
                    console.error(
                        chalk.red(
                            `✖ ${method.toUpperCase()} ${url} - ${
                                error.response.status
                            }`
                        )
                    );
                }
            }
        }
    }
}

export default Runner;
