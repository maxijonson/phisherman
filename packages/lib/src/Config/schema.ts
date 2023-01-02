import { z } from "zod";

const baseUrlSchema = z
    .string()
    .url("'baseUrl' must be a valid URL")
    .transform((url) => {
        let u = url;
        while (u.endsWith("/")) {
            u = u.slice(0, -1);
        }
        return u;
    });

const iterationsSchema = z
    .number()
    .min(1, "iterations must be at least 1")
    .default(100);

const concurrencySchema = z
    .number()
    .min(1, "concurrency must be at least 1")
    .default(10);

const endpointSchema = z.object({
    path: z
        .string()
        .or(z.array(z.string()))
        .transform((path) => {
            if (typeof path === "string") {
                return [path];
            }
            return path;
        })
        .refine((paths) => {
            for (const path of paths) {
                if (!path[0].match(/[a-zA-Z/_]/)) {
                    throw new Error(
                        "path must start with a letter, number, slash (/) or underscore (_)"
                    );
                }
            }
            return true;
        })
        .transform((paths) => {
            return paths.map((path) => {
                let p = path;
                while (p.startsWith("/")) {
                    p = p.slice(1);
                }
                return p;
            });
        }),
    method: z.literal("PATCH").or(z.literal("POST")).or(z.literal("PUT")),
    data: z.object({
        type: z
            .literal("form-data")
            .or(z.literal("x-www-form-urlencoded"))
            .or(z.literal("json")),
        body: z.record(z.string().or(z.number()).or(z.boolean())),
    }),
    headers: z.record(z.string()).default({}),
});

const endpointsSchema = z.array(endpointSchema).transform((endpoints) => {
    return endpoints.reduce((acc, endpoint) => {
        for (const path of endpoint.path) {
            acc.push({
                ...endpoint,
                path,
            });
        }
        return acc;
    }, [] as (Omit<typeof endpoints[number], "path"> & { path: string })[]);
});

export const configSchema = z.object({
    baseUrl: baseUrlSchema,
    iterations: iterationsSchema,
    concurrency: concurrencySchema,
    endpoints: endpointsSchema,
});

export type ConfigModel = z.infer<typeof configSchema>;

export type Endpoint = ConfigModel["endpoints"][number];
export type EndpointData = Endpoint["data"];
export type EndpointDataBody = EndpointData["body"];
export type EndpointHeaders = Endpoint["headers"];
