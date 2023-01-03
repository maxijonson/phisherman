import PQueue from "p-queue";
import "../Template"; // HACK: Importing all templates so they register themselves
import Config from "../Config/Config";
import Identity from "../Identity/Identity";
import axios from "axios";
import { Endpoint, EndpointData } from "../Config/schema";
import Template from "../Template/Template";

class Runner {
    private identities: Identity[] = [];
    private queue: PQueue;
    private queueHasInit = false;

    constructor(private config: Config) {
        this.generateIdentities();
    }

    private generateIdentities() {
        this.identities = [];
        for (let i = 0; i < this.config.iterations; i++) {
            this.identities.push(new Identity());
        }
    }

    private async initQueue() {
        this.queue = new PQueue({ concurrency: this.config.concurrency });
        this.queue.pause();
        this.queue.addAll(
            this.identities.map(
                (identity) => () => this.spamEndpoints(identity)
            )
        );
        this.queueHasInit = true;
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

    /**
     * Sends the given identity's credentials to the given endpoint.
     */
    public async sendCredentials(
        identity: Identity,
        endpoint: Endpoint,
        cookie?: string
    ) {
        const url = `${this.config.baseUrl}/${endpoint.path}`;
        const method = endpoint.method.toLowerCase();
        const data = this.getTransformedData(endpoint.data, identity, endpoint);
        const headers = this.applyTemplates(
            endpoint.headers,
            identity,
            endpoint
        );

        if (cookie) {
            headers["Cookie"] = cookie;
        }

        const response = await axios({
            url,
            method,
            data,
            headers,
        });

        return response;
    }

    /**
     * Spams all endpoints with the given identity.
     */
    public async spamEndpoints(identity: Identity) {
        let cookie = "";

        for (const endpoint of this.config.endpoints) {
            try {
                const response = await this.sendCredentials(
                    identity,
                    endpoint,
                    cookie
                );

                if (response.headers["set-cookie"]) {
                    cookie = response.headers["set-cookie"][0];
                }
            } catch (_) {}
        }
    }

    /**
     * Starts the spammer. Returns a promise when the queue has been initialized and the runner has started. (Not when the spamming has finished)
     */
    public async start() {
        if (!this.queueHasInit) {
            await this.initQueue();
        }
        this.queue.start();
    }

    /**
     * Pauses the spammer.
     */
    public pause() {
        this.queue.pause();
    }

    public async waitForCompleted() {
        await this.queue.onIdle();
    }
}

export default Runner;
