import Identity from "../Identity/Identity";
import Template from "./Template";

class FirstNameTemplate extends Template {
    public static readonly template = "first-name";

    public static getValue(identity: Identity): string {
        return identity.firstName;
    }
}

Template.registerTemplate(
    FirstNameTemplate.template,
    FirstNameTemplate.getValue
);

export default FirstNameTemplate;
