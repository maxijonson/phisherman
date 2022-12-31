import "../Template";
import Config from "../Config/Config";
import Identity from "../Identity/Identity";
import axios from "axios";
import chalk from "chalk";
import { Endpoint, EndpointData } from "../Config/schema";
import Template from "../Template/Template";

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

    private applyTemplates(
        obj: object,
        identity: Identity,
        endpoint: Endpoint
    ) {
        const result: { [key: string]: any } = {};

        for (const [key, value] of Object.entries(obj)) {
            const transformedKey = Template.apply(key, identity, endpoint);
            const transformedValue =
                typeof value === "string"
                    ? Template.apply(value, identity, endpoint)
                    : value; // TODO: Handle non-string values
            result[transformedKey] = transformedValue;
        }

        return result;
    }

    private getTransformedData(
        data: EndpointData,
        identity: Identity,
        endpoint: Endpoint
    ) {
        const result = this.applyTemplates(data.body, identity, endpoint);

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
            let cookie = "";
            for (const endpoint of this.config.endpoints) {
                const url = `${this.config.baseUrl}/${endpoint.path}`;
                const method = endpoint.method.toLowerCase();
                const data = this.getTransformedData(
                    endpoint.data,
                    identity,
                    endpoint
                );
                const headers = this.applyTemplates(
                    endpoint.headers,
                    identity,
                    endpoint
                );

                if (cookie) {
                    headers["Cookie"] = cookie;
                }

                try {
                    const response = await axios({
                        url,
                        method,
                        data,
                        headers,
                    });

                    if (response.headers["set-cookie"]) {
                        cookie = response.headers["set-cookie"][0];
                    }

                    console.info(
                        chalk.green(
                            "✔",
                            `[${identity.id}]`,
                            method.toUpperCase(),
                            url
                        )
                    );
                } catch (error) {
                    console.error(
                        chalk.red(
                            "❌",
                            `[${identity.id}]`,
                            method.toUpperCase(),
                            url
                        )
                    );
                }
            }
        }
    }
}

export default Runner;
