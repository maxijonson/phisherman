import rand from "../utils/rand";
import Template from "./Template";

class ThreePinTemplate extends Template {
    public static readonly template = "3pin";

    public static getValue(): string {
        return rand.natural({ min: 100, max: 999 }).toString();
    }
}

Template.registerTemplate(ThreePinTemplate.template, ThreePinTemplate.getValue);

export default ThreePinTemplate;