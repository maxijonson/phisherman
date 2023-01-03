import { ArgumentsCamelCase, Argv } from "yargs";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import Phisherman, { Identity, Endpoint } from "@maxijonson/phisherman";

const CWD = process.cwd();
const DEFAULT_CONFIG = "phisherman.config.json";

interface RunCommandArgv {
    config: string;
}

class RunCommand {
    private static readonly PROGRESS_WIDTH = 15;
    private static readonly LABEL_WIDTH = 30;

    private static phisherman: Phisherman;

    private static completedIdentities: Identity[] = [];
    private static successfulEndpoints: Endpoint[] = [];
    private static failedEndpoints: Endpoint[] = [];

    public static readonly command = "run [config]";
    public static readonly description = "Runs the phishing spammer";

    private static printInBox(content: string, progressPercent: number) {
        const progress = Math.round(progressPercent);
        const lines = content.split("\n");
        const maxLength = Math.max(
            RunCommand.PROGRESS_WIDTH + RunCommand.LABEL_WIDTH,
            ...lines.map((line) => line.length)
        );
        const header = "Phisherman";
        const horizontalRule = "-".repeat(maxLength + 2);

        let output = "\r\x1Bc";

        output += `+${horizontalRule}+\n`;
        output += `| ${header
            .padStart(maxLength / 2 + header.length / 2)
            .padEnd(maxLength)} |\n`;
        output += `+${horizontalRule}+\n`;

        for (const line of lines) {
            output += `| ${line.padEnd(maxLength)} |\n`;
        }
        output += `+${horizontalRule}+\n`;

        const progressWidth = Math.round((progress / 100) * (maxLength + 2));
        const progressString = ` ${progress}% `.padEnd(progressWidth, "=");
        output += `|${progressString.padEnd(maxLength + 2, " ")}|\n`;
        output += `+${horizontalRule}+\r`;

        process.stdout.write(output);
    }

    private static updateProgress() {
        // TOTALS
        const totalIdentityCount = RunCommand.phisherman.config.iterations;
        const totalFakeCredentialCount =
            totalIdentityCount * RunCommand.phisherman.config.endpoints.length;

        // IDENTITY STATS
        const identityCount = RunCommand.completedIdentities.length;
        const identityProgress =
            `${identityCount}/${totalIdentityCount}`.padEnd(
                RunCommand.PROGRESS_WIDTH
            );
        const identityProgressLabel = "Identities Processed".padEnd(
            RunCommand.LABEL_WIDTH
        );
        const identityStats = identityProgress + identityProgressLabel;

        // FAKE CREDENTIAL STATS
        const fakeCredentialCount =
            RunCommand.successfulEndpoints.length +
            RunCommand.failedEndpoints.length;
        const fakeCredentialProgress =
            `${fakeCredentialCount}/${totalFakeCredentialCount}`.padEnd(
                RunCommand.PROGRESS_WIDTH
            );
        const fakeCredentialProgressLabel = "Fake Credentials Sent".padEnd(
            RunCommand.LABEL_WIDTH
        );
        const fakeCredentialStats =
            fakeCredentialProgress + fakeCredentialProgressLabel;

        // SUCCESSFUL REQUEST STATS
        const successfulRequestCount = RunCommand.successfulEndpoints.length;
        const successfulRequestProgress =
            `${successfulRequestCount}/${fakeCredentialCount}`.padEnd(
                RunCommand.PROGRESS_WIDTH
            );
        const successfulRequestPercent = Math.round(
            (successfulRequestCount / fakeCredentialCount) * 100
        );
        const successfulRequestProgressLabel =
            `Successful Requests (${successfulRequestPercent}%)`.padEnd(
                RunCommand.LABEL_WIDTH
            );
        const successfulRequestStats =
            successfulRequestProgress + successfulRequestProgressLabel;

        // FAILED REQUEST STATS
        const failedRequestCount = RunCommand.failedEndpoints.length;
        const failedRequestProgress =
            `${failedRequestCount}/${fakeCredentialCount}`.padEnd(
                RunCommand.PROGRESS_WIDTH
            );
        const failedRequestPercent = Math.round(
            (failedRequestCount / fakeCredentialCount) * 100
        );
        const failedRequestProgressLabel =
            `Failed Requests (${failedRequestPercent}%)`.padEnd(
                RunCommand.LABEL_WIDTH
            );
        const failedRequestStats =
            failedRequestProgress + failedRequestProgressLabel;

        // DRAW
        RunCommand.printInBox(
            [
                identityStats,
                fakeCredentialStats,
                successfulRequestStats,
                failedRequestStats,
            ].join("\n"),
            (fakeCredentialCount / totalFakeCredentialCount) * 100
        );
    }

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
        RunCommand.phisherman = new Phisherman(configObject);

        RunCommand.phisherman.onEndpointSuccess(
            (_response, _identity, endpoint) => {
                RunCommand.successfulEndpoints.push(endpoint);
                RunCommand.updateProgress();
            }
        );

        RunCommand.phisherman.onEndpointError(
            (_error: any, _identity, endpoint) => {
                RunCommand.failedEndpoints.push(endpoint);
                RunCommand.updateProgress();
            }
        );

        RunCommand.phisherman.onIdentityComplete((identity) => {
            RunCommand.completedIdentities.push(identity);
            RunCommand.updateProgress();
        });

        await RunCommand.phisherman.start();
        RunCommand.updateProgress();
        await RunCommand.phisherman.waitForCompleted();
    }

    private constructor() {}
}

export default RunCommand;
