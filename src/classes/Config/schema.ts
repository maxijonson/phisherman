import { z } from "zod";

export const configSchema = z.object({
    baseUrl: z.string().url("'baseUrl' must be a valid URL"),
    endpoints: z.array(
        z.object({
            path: z.string(),
            method: z
                .string()
                .refine(
                    (value) => ["GET", "POST", "PUT", "DELETE"].includes(value),
                    {
                        message:
                            "'method' must be one of 'GET', 'POST', 'PUT', or 'DELETE'",
                    }
                ),
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
