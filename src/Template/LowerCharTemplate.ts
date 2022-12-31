import rand from "../utils/rand";
import Template from "./Template";

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
