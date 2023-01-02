import Identity from "../Identity/Identity";
import Template from "./Template";

class UsernameTemplate {
    public static readonly template = "username";

    public static getValue(identity: Identity): string {
        return identity.username;
    }
}

Template.registerTemplate(UsernameTemplate.template, UsernameTemplate.getValue);

export default UsernameTemplate;
