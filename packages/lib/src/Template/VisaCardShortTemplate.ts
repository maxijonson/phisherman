import Identity from "../Identity/Identity";
import Template from "./Template";

class VisaCardShortTemplate {
    public static readonly template = "cc-visa-short";

    public static getValue(identity: Identity): string {
        return identity.visa.num;
    }
}

Template.registerTemplate(
    VisaCardShortTemplate.template,
    VisaCardShortTemplate.getValue
);

export default VisaCardShortTemplate;
