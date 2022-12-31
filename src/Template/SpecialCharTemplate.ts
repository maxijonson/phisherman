import Chance from "chance";
import Template from "./Template";

const rand = Chance();

class SpecialCharTemplate extends Template {
    public static readonly template = "s";

    public static getValue(): string {
        return rand.character({
            pool: "!@#$%^&*()_+-=[]{};':,./<>?`~",
        });
    }
}

Template.registerTemplate(
    SpecialCharTemplate.template,
    SpecialCharTemplate.getValue
);

export default SpecialCharTemplate;
