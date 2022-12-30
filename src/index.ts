import yargs from "yargs";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import Config from "./Config/Config";
import Runner from "./Runner/Runner";

/**
 * Commands:
 * init - Generates a config file by copying the templates/config.example.json to config.json in the directory where the command is run. `phisherman init`
 * run - Runs the phishing spammer with the specified config file. `phisherman run ./config.json`
 */

const CWD = process.cwd();
const DEFAULT_CONFIG = "phisherman.config.json";

(async () => {
    const argv = await yargs
        .scriptName("phisherman")
        .command(
            "init [name]",
            "Generates a config file in the directory where the command is run.",
            (yargs) => {
                return yargs.positional("name", {
                    type: "string",
                    description: "The name of the config file to generate.",
                    default: DEFAULT_CONFIG,
                });
            },
            ({ name }) => {
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
                    chalk.green(
                        `✔ Phisherman config file generated: ${fileName}`
                    )
                );
                console.info(
                    chalk.blue(
                        `▶ Edit the config file to your liking and run '${chalk.bold(
                            command
                        )}' to start the spammer.`
                    )
                );
            }
        )
        .command(
            "run",
            "Runs the phishing spammer.",
            (yargs) => {
                return yargs
                    .option("config", {
                        type: "string",
                        default: path.join(CWD, DEFAULT_CONFIG),
                        alias: "c",
                        describe: "The config file to use.",
                    })
                    .option("iterations", {
                        type: "number",
                        alias: "i",
                        describe: "The number of fake identities to create.",
                    });
            },
            async (argv) => {
                const config = new Config(argv.config, {
                    iterations: argv.iterations,
                });
                const runner = new Runner(config);
                await runner.run();
            }
        )
        .help().argv;

    if (argv._.length === 0) {
        yargs.showHelp();
    }
})();
