import Identity from "../Identity/Identity";
import Template from "./Template";

class PasswordTemplate extends Template {
    public static readonly template = "password";

    public static getValue(identity: Identity): string {
        return identity.password;
    }
}

Template.registerTemplate(PasswordTemplate.template, PasswordTemplate.getValue);

export default PasswordTemplate;
