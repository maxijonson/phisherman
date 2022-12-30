import yargs from "yargs";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";

/**
 * Commands:
 * init - Generates a config file by copying the templates/config.example.json to config.json in the directory where the command is run. `phisherman init`
 * run - Runs the phishing spammer with the specified config file. `phisherman run ./config.json`
 */

const CWD = process.cwd();

(async () => {
    const argv = await yargs
        .scriptName("phisherman")
        .command(
            "init",
            "Generates a config file in the directory where the command is run.",
            (yargs) => {
                return yargs;
            },
            () => {
                fs.copySync(
                    path.join(__dirname, "templates", "config.example.json"),
                    path.join(CWD, "phisherman.config.json")
                );
                console.info(
                    chalk.green(
                        "✔ phisherman.config.json config file generated!"
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
                        default: path.join(CWD, "phisherman.config.json"),
                        alias: "c",
                        describe: "The config file to use.",
                    })
                    .option("iterations", {
                        type: "number",
                        default: 100,
                        alias: "i",
                        describe: "The number of fake identities to create.",
                    });
            },
            () => {
                console.info("run");
            }
        )
        .help().argv;

    if (argv._.length === 0) {
        yargs.showHelp();
    }
})();
