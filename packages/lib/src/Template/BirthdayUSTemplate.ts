import Identity from "../Identity/Identity";
import Template from "./Template";

class BirthdayUSTemplate {
    public static readonly template = "birthdayus";

    public static getValue(identity: Identity): string {
        return identity.birthday.toLocaleDateString("en-US");
    }
}

Template.registerTemplate(
    BirthdayUSTemplate.template,
    BirthdayUSTemplate.getValue
);

export default BirthdayUSTemplate;
