#!/usr/bin/env node
import yargs from "yargs";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import Phisherman from "@maxijonson/phisherman";

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
            "run [config]",
            "Runs the phishing spammer.",
            (yargs) => {
                return yargs.positional("config", {
                    type: "string",
                    default: path.join(CWD, DEFAULT_CONFIG),
                    alias: "c",
                    describe: "The config file to use.",
                });
            },
            async (argv) => {
                if (!fs.existsSync(argv.config)) {
                    console.error(
                        chalk.red(
                            `✖ Config file not found: ${
                                argv.config
                            }. Run '${chalk.bold(
                                "phisherman init"
                            )}' to generate a config file.`
                        )
                    );
                    return;
                }

                const configObject = fs.readJSONSync(argv.config);
                const phisherman = new Phisherman(configObject);
                await phisherman.run();
            }
        )
        .help().argv;

    if (argv._.length === 0) {
        yargs.showHelp();
    }
})();
