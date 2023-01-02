import Identity from "../Identity/Identity";
import Template from "./Template";

class SSNTemplate extends Template {
    public static readonly template = "ssn";

    public static getValue(identity: Identity): string {
        const { ssn } = identity;
        return `${ssn.slice(0, 3)}-${ssn.slice(3, 5)}-${ssn.slice(5)}`;
    }
}

Template.registerTemplate(SSNTemplate.template, SSNTemplate.getValue);

export default SSNTemplate;
