import { z } from "zod";

export const configSchema = z.object({
    baseUrl: z
        .string()
        .url("'baseUrl' must be a valid URL")
        .transform((url) => {
            if (url.endsWith("/")) {
                return url.slice(0, -1);
            }
            return url;
        }),
    iterations: z.number().min(1, "iterations must be at least 1").default(100),
    endpoints: z.array(
        z.object({
            path: z
                .string()
                .refine((path) => {
                    if (!path[0].match(/[a-zA-Z/_]/)) {
                        throw new Error(
                            "path must start with a letter, number, slash (/) or underscore (_)"
                        );
                    }
                    return true;
                })
                .transform((path) => {
                    if (path.startsWith("/")) {
                        return path.slice(1);
                    }
                    return path;
                }),
            method: z
                .literal("PATCH")
                .or(z.literal("POST"))
                .or(z.literal("PUT")),
            data: z.object({
                type: z
                    .literal("form-data")
                    .or(z.literal("x-www-form-urlencoded"))
                    .or(z.literal("json")),
                body: z.record(z.string().or(z.number()).or(z.boolean())),
            }),
            headers: z.record(z.string()).default({}),
        })
    ),
});

export type ConfigModel = z.infer<typeof configSchema>;

export type Endpoint = ConfigModel["endpoints"][number];
export type EndpointData = Endpoint["data"];
export type EndpointDataBody = EndpointData["body"];
export type EndpointHeaders = Endpoint["headers"];
