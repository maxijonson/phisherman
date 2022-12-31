import chalk from "chalk";
import Identity from "../Identity/Identity";

abstract class Template {
    private static templateMap: Record<string, (identity: Identity) => string> =
        {};

    private static getReplacement(
        template: string,
        identity: Identity
    ): string {
        if (!this.templateMap[template]) {
            console.warn(
                chalk.yellow(
                    `⚠ Template '${template}' is not registered. Returning raw template.`
                )
            );
            return `{{${template}}}`;
        }
        return this.templateMap[template](identity);
    }

    public static registerTemplate(
        template: string,
        replacementFn: (identity: Identity) => string
    ) {
        this.templateMap[template] = replacementFn;
    }

    public static apply(str: string, identity: Identity): string {
        return str.replace(/{{([a-zA-Z0-9-]+)}}/g, (_, template) => {
            return this.getReplacement(template, identity);
        });
    }
}

export default Template;
