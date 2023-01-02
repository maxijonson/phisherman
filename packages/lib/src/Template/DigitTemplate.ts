import rand from "../utils/rand";
import Template from "./Template";

class DigitTemplate {
    public static readonly template = "d";

    public static getValue(): string {
        return rand.character({ pool: "0123456789" });
    }
}

Template.registerTemplate(DigitTemplate.template, DigitTemplate.getValue);

export default DigitTemplate;
