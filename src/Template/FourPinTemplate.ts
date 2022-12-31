import Chance from "chance";
import Template from "./Template";

const rand = Chance();

class FourPinTemplate extends Template {
    public static readonly template = "4pin";

    public static getValue(): string {
        return rand.natural({ min: 1000, max: 9999 }).toString();
    }
}

Template.registerTemplate(FourPinTemplate.template, FourPinTemplate.getValue);

export default FourPinTemplate;
