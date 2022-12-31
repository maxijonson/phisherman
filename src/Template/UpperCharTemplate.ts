import rand from "../utils/rand";
import Template from "./Template";

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
