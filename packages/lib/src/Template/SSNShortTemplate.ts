import Identity from "../Identity/Identity";
import Template from "./Template";

class SSNShortTemplate {
    public static readonly template = "ssn-short";

    public static getValue(identity: Identity): string {
        return identity.ssn;
    }
}

Template.registerTemplate(SSNShortTemplate.template, SSNShortTemplate.getValue);

export default SSNShortTemplate;
