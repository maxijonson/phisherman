import Identity from "../Identity/Identity";
import Template from "./Template";

class PhoneTemplate {
    public static readonly template = "phone";

    public static getValue(identity: Identity): string {
        return identity.phone.replace(/\D/g, "");
    }
}

Template.registerTemplate(PhoneTemplate.template, PhoneTemplate.getValue);

export default PhoneTemplate;
