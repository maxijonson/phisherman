import Identity from "../Identity/Identity";
import Template from "./Template";

class SINShortTemplate {
    public static readonly template = "sin-short";

    public static getValue(identity: Identity): string {
        return identity.ssn;
    }
}

Template.registerTemplate(SINShortTemplate.template, SINShortTemplate.getValue);

export default SINShortTemplate;
