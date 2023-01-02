import Identity from "../Identity/Identity";
import Template from "./Template";

class BirthdayUSDashTemplate {
    public static readonly template = "birthdayus-dash";

    public static getValue(identity: Identity): string {
        return identity.birthday
            .toLocaleDateString("en-US")
            .replace(/\//g, "-");
    }
}

Template.registerTemplate(
    BirthdayUSDashTemplate.template,
    BirthdayUSDashTemplate.getValue
);

export default BirthdayUSDashTemplate;
