import chalk from "chalk";
import { Endpoint } from "../Config/schema";
import Identity from "../Identity/Identity";

abstract class Template {
    private static templateMap: Record<
        string,
        (identity: Identity, endpoint: Endpoint) => string
    > = {};

    private static getReplacement(
        template: string,
        identity: Identity,
        endpoint: Endpoint
    ): string {
        if (!this.templateMap[template]) {
            console.warn(
                chalk.yellow(
                    `⚠ Template '${template}' is not registered. Returning raw template.`
                )
            );
            return `{{${template}}}`;
        }
        return this.templateMap[template](identity, endpoint);
    }

    public static registerTemplate(
        template: string,
        replacementFn: (identity: Identity, endpoint: Endpoint) => string
    ) {
        this.templateMap[template] = replacementFn;
    }

    public static apply(
        str: string,
        identity: Identity,
        endpoint: Endpoint
    ): string {
        return str.replace(/{{([a-zA-Z0-9-]+)}}/g, (_, template) => {
            return this.getReplacement(template, identity, endpoint);
        });
    }
}

export default Template;
