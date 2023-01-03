import { ArgumentsCamelCase, Argv } from "yargs";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import Phisherman from "@maxijonson/phisherman";

const CWD = process.cwd();
const DEFAULT_CONFIG = "phisherman.config.json";

interface RunCommandArgv {
    config: string;
}

class RunCommand {
    public static readonly command = "run [config]";

    public static readonly description = "Runs the phishing spammer";

    public static builder(yargs: Argv) {
        return yargs.positional("config", {
            type: "string",
            default: path.join(CWD, DEFAULT_CONFIG),
            describe: "The config file to use.",
        });
    }

    public static async handler({
        config: configPath,
    }: ArgumentsCamelCase<RunCommandArgv>) {
        if (!fs.existsSync(configPath)) {
            console.error(
                chalk.red(
                    `✖ Config file not found: ${configPath}. Run '${chalk.bold(
                        "phisherman init"
                    )}' to generate a config file.`
                )
            );
            return;
        }

        const configObject = fs.readJSONSync(configPath);
        const phisherman = new Phisherman(configObject);

        phisherman.onEndpointSuccess((response, identity, endpoint) => {
            console.info(
                chalk.green(
                    `✔ [${identity.id}] - ${endpoint.method} ${endpoint.path}`
                )
            );
        });

        phisherman.onEndpointError((error: any, identity, endpoint) => {
            let m = `✖ [${identity.id}] - ${endpoint.method} ${endpoint.path}`;

            if (error.response?.status) {
                m += ` (${error.response.status})`;
            }

            console.error(chalk.red(m));
        });

        phisherman.onIdentityComplete((identity, successCount) => {
            console.info(
                chalk.blue(
                    `▶ Identity ${identity.id} completed with ${successCount} successful requests.`
                )
            );
        });

        await phisherman.start();
        await phisherman.waitForCompleted();
    }

    private constructor() {}
}

export default RunCommand;
