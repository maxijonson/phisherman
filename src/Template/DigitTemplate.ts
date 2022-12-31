import Chance from "chance";
import Template from "./Template";

const rand = Chance();

class DigitTemplate extends Template {
    public static readonly template = "d";

    public static getValue(): string {
        return rand.character({ pool: "0123456789" });
    }
}

Template.registerTemplate(DigitTemplate.template, DigitTemplate.getValue);

export default DigitTemplate;
