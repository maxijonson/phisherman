import rand from "../utils/rand";
import Template from "./Template";

class SpecialCharTemplate {
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
