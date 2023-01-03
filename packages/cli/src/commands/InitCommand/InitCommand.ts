import { ArgumentsCamelCase, Argv } from "yargs";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";

const CWD = process.cwd();
const DEFAULT_CONFIG = "phisherman.config.json";

interface InitCommandArgv {
    name: string;
}

class InitCommand {
    public static readonly command = "init [name]";

    public static readonly description = "Initialize a new config file";

    public static builder(yargs: Argv) {
        return yargs.positional("name", {
            type: "string",
            description:
                "Generates a config file in the directory where the command is run.",
            default: DEFAULT_CONFIG,
        });
    }

    public static async handler({ name }: ArgumentsCamelCase<InitCommandArgv>) {
        const fileName = name.endsWith(".json") ? name : `${name}.json`;
        const command =
            fileName === DEFAULT_CONFIG
                ? "phisherman run"
                : `phisherman run ${fileName}`;

        fs.copySync(
            path.join(__dirname, "config.example.json"),
            path.join(CWD, fileName)
        );

        console.info(
            chalk.green(`✔ Phisherman config file generated: ${fileName}`)
        );
        console.info(
            chalk.blue(
                `▶ Edit the config file to your liking and run '${chalk.bold(
                    command
                )}' to start the spammer.`
            )
        );
    }
}

export default InitCommand;
