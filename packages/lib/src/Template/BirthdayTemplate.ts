import Identity from "../Identity/Identity";
import Template from "./Template";

class BirthdayTemplate {
    public static readonly template = "birthday";

    public static getValue(identity: Identity): string {
        return identity.birthday.toISOString().split("T")[0];
    }
}

Template.registerTemplate(BirthdayTemplate.template, BirthdayTemplate.getValue);

export default BirthdayTemplate;
