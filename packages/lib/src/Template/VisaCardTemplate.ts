import Identity from "../Identity/Identity";
import Template from "./Template";

class VisaCardTemplate extends Template {
    public static readonly template = "cc-visa";

    public static getValue(identity: Identity): string {
        return identity.visa.num.replace(/(.{4})/g, "$1 ").slice(0, -1);
    }
}

Template.registerTemplate(VisaCardTemplate.template, VisaCardTemplate.getValue);

export default VisaCardTemplate;
