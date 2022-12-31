import Identity from "../Identity/Identity";
import Template from "./Template";

class BirthdaySlashTemplate extends Template {
    public static readonly template = "birthday-slash";

    public static getValue(identity: Identity): string {
        return identity.birthday.toISOString().split("T")[0].replace(/-/g, "/");
    }
}

Template.registerTemplate(
    BirthdaySlashTemplate.template,
    BirthdaySlashTemplate.getValue
);

export default BirthdaySlashTemplate;
