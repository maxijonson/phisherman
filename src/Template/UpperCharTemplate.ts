import Chance from "chance";
import Template from "./Template";

const rand = Chance();

class UpperCharTemplate extends Template {
    public static readonly template = "C";

    public static getValue(): string {
        return rand.character({ casing: "upper" });
    }
}

Template.registerTemplate(
    UpperCharTemplate.template,
    UpperCharTemplate.getValue
);

export default UpperCharTemplate;
