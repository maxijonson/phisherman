import Config from "../Config/Config";

class Runner {
    constructor(private config: Config, private iterations: number) {}

    public async run() {
        console.info("Running...");
    }
}

export default Runner;
