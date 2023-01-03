#!/usr/bin/env node
import yargs from "yargs";
import InitCommand from "./commands/InitCommand/InitCommand";
import RunCommand from "./commands/RunCommand/RunCommand";

(async () => {
    const argv = await yargs
        .scriptName("phisherman")
        .command(
            InitCommand.command,
            InitCommand.description,
            InitCommand.builder,
            InitCommand.handler
        )
        .command(
            RunCommand.command,
            RunCommand.description,
            RunCommand.builder,
            RunCommand.handler
        )
        .help().argv;

    if (argv._.length === 0) {
        yargs.showHelp();
    }
})();
