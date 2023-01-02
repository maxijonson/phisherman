import Config from "../Config/Config";
import { ConfigModel } from "../Config/schema";
import Runner from "../Runner/Runner";

class Phisherman {
    private config: Config;
    private runner: Runner;

    constructor(config: ConfigModel) {
        this.config = new Config(config);
        this.runner = new Runner(this.config);
    }

    public async run() {
        await this.runner.run();
    }
}

export default Phisherman;
