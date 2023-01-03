import PQueue from "p-queue";
import "../Template"; // HACK: Importing all templates so they register themselves
import Config from "../Config/Config";
import Identity from "../Identity/Identity";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Endpoint, EndpointData } from "../Config/schema";
import Template from "../Template/Template";

interface OnEndpointSuccessCallback {
    (response: AxiosResponse, identity: Identity, endpoint: Endpoint): void;
}

interface OnEndpointErrorCallback {
    (error: AxiosError | Error, identity: Identity, endpoint: Endpoint): void;
}

interface OnIdentityCompleteCallback {
    (identity: Identity, successCount: number): void;
}

class Runner {
    private identities: Identity[] = [];
    private queue: PQueue;
    private queueHasInit = false;

    private onEndpointSuccessCallbacks: OnEndpointSuccessCallback[] = [];
    private onEndpointErrorCallbacks: OnEndpointErrorCallback[] = [];
    private onIdentityCompleteCallbacks: OnIdentityCompleteCallback[] = [];

    constructor(private config: Config) {
        this.generateIdentities();
        this.queue = new PQueue({ concurrency: this.config.concurrency });
    }

    private generateIdentities() {
        this.identities = [];
        for (let i = 0; i < this.config.iterations; i++) {
            this.identities.push(new Identity());
        }
    }

    private async initQueue() {
        this.queue.pause();
        this.queue.addAll(
            this.identities.map((identity) => async () => {
                const successCount = await this.spamEndpoints(identity);
                this.notifyIdentityComplete(identity, successCount);
            })
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

    private notifyEndpointSuccess(
        response: AxiosResponse,
        identity: Identity,
        endpoint: Endpoint
    ) {
        for (const callback of this.onEndpointSuccessCallbacks) {
            callback(response, identity, endpoint);
        }
    }

    private notifyEndpointError(
        error: Error,
        identity: Identity,
        endpoint: Endpoint
    ) {
        for (const callback of this.onEndpointErrorCallbacks) {
            callback(error, identity, endpoint);
        }
    }

    private notifyIdentityComplete(identity: Identity, successCount: number) {
        for (const callback of this.onIdentityCompleteCallbacks) {
            callback(identity, successCount);
        }
    }

    /**
     * Spams all endpoints with the given identity. Returns the number of successful requests.
     */
    public async spamEndpoints(identity: Identity) {
        let cookie = "";
        let successCount = 0;

        for (const endpoint of this.config.endpoints) {
            try {
                const response = await this.sendCredentials(
                    identity,
                    endpoint,
                    cookie
                );

                this.notifyEndpointSuccess(response, identity, endpoint);
                ++successCount;

                if (response.headers["set-cookie"]) {
                    cookie = response.headers["set-cookie"][0];
                }
            } catch (error) {
                this.notifyEndpointError(error, identity, endpoint);
            }
        }

        return successCount;
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

    /**
     * Promise that resolves when the spammer has finished.
     */
    public async waitForCompleted() {
        await this.queue.onIdle();
    }

    /**
     * Callback that is called when an endpoint has been successfully sent a request to.
     */
    public onEndpointSuccess(callback: OnEndpointSuccessCallback) {
        this.onEndpointSuccessCallbacks.push(callback);
    }

    /**
     * Removes the given callback from the list of callbacks that are called when an endpoint has been successfully sent a request to.
     */
    public offEndpointSuccess(callback: OnEndpointSuccessCallback) {
        this.onEndpointSuccessCallbacks =
            this.onEndpointSuccessCallbacks.filter((cb) => cb !== callback);
    }

    /**
     * Removes all callbacks that are called when an endpoint has been successfully sent a request to.
     */
    public offAllEndpointSuccess() {
        this.onEndpointSuccessCallbacks = [];
    }

    /**
     * Callback that is called when an endpoint has failed to send a request to.
     */
    public onEndpointError(callback: OnEndpointErrorCallback) {
        this.onEndpointErrorCallbacks.push(callback);
    }

    /**
     * Removes the given callback from the list of callbacks that are called when an endpoint has failed to send a request to.
     */
    public offEndpointError(callback: OnEndpointErrorCallback) {
        this.onEndpointErrorCallbacks = this.onEndpointErrorCallbacks.filter(
            (cb) => cb !== callback
        );
    }

    /**
     * Removes all callbacks that are called when an endpoint has failed to send a request to.
     */
    public offAllEndpointError() {
        this.onEndpointErrorCallbacks = [];
    }

    /**
     * Callback that is called when an identity has completed all endpoints.
     */
    public onIdentityComplete(callback: OnIdentityCompleteCallback) {
        this.onIdentityCompleteCallbacks.push(callback);
    }

    /**
     * Removes the given callback from the list of callbacks that are called when an identity has completed all endpoints.
     */
    public offIdentityComplete(callback: OnIdentityCompleteCallback) {
        this.onIdentityCompleteCallbacks =
            this.onIdentityCompleteCallbacks.filter((cb) => cb !== callback);
    }

    /**
     * Removes all callbacks that are called when an identity has completed all endpoints.
     */
    public offAllIdentityComplete() {
        this.onIdentityCompleteCallbacks = [];
    }
}

export default Runner;
