import Chance from "chance";
import Template from "./Template";

const rand = Chance();

class LowerCharTemplate extends Template {
    public static readonly template = "c";

    public static getValue(): string {
        return rand.character({ casing: "lower" });
    }
}

Template.registerTemplate(
    LowerCharTemplate.template,
    LowerCharTemplate.getValue
);

export default LowerCharTemplate;
