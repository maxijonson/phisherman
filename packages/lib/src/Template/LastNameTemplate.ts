import Identity from "../Identity/Identity";
import Template from "./Template";

class LastNameTemplate extends Template {
    public static readonly template = "last-name";

    public static getValue(identity: Identity): string {
        return identity.lastName;
    }
}

Template.registerTemplate(LastNameTemplate.template, LastNameTemplate.getValue);

export default LastNameTemplate;
