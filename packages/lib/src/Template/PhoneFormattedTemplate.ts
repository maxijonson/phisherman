import Identity from "../Identity/Identity";
import Template from "./Template";

class PhoneFormattedTemplate {
    public static readonly template = "phone-format";

    public static getValue(identity: Identity): string {
        return identity.phone;
    }
}

Template.registerTemplate(
    PhoneFormattedTemplate.template,
    PhoneFormattedTemplate.getValue
);

export default PhoneFormattedTemplate;
