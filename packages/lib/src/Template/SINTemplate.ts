import Identity from "../Identity/Identity";
import Template from "./Template";

class SINTemplate {
    public static readonly template = "sin";

    public static getValue(identity: Identity): string {
        const { ssn } = identity;
        return `${ssn.slice(0, 3)}-${ssn.slice(3, 6)}-${ssn.slice(6)}`;
    }
}

Template.registerTemplate(SINTemplate.template, SINTemplate.getValue);

export default SINTemplate;
