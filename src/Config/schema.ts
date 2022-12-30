import { z } from "zod";

export const configSchema = z.object({
    baseUrl: z.string().url("'baseUrl' must be a valid URL"),
    iterations: z.number().min(1, "iterations must be at least 1").optional(),
    endpoints: z.array(
        z.object({
            path: z.string(),
            method: z
                .literal("GET")
                .or(z.literal("POST"))
                .or(z.literal("PUT"))
                .or(z.literal("DELETE")),
            data: z.object({
                type: z
                    .literal("form-data")
                    .or(z.literal("x-www-form-urlencoded"))
                    .or(z.literal("json")),
                body: z.record(z.string().or(z.number()).or(z.boolean())),
            }),
        })
    ),
});

export type ConfigModel = z.infer<typeof configSchema>;
