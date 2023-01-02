import rand from "../utils/rand";
import Template from "./Template";

class FourPinTemplate extends Template {
    public static readonly template = "4pin";

    public static getValue(): string {
        return rand.natural({ min: 1000, max: 9999 }).toString();
    }
}

Template.registerTemplate(FourPinTemplate.template, FourPinTemplate.getValue);

export default FourPinTemplate;
