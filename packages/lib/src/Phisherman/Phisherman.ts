import Config from "../Config/Config";
import { ConfigModel } from "../Config/schema";
import Runner from "../Runner/Runner";

class Phisherman extends Runner {
    constructor(config: ConfigModel) {
        super(new Config(config));
    }
}

export default Phisherman;
