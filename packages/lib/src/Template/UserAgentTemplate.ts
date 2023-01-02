import Identity from "../Identity/Identity";
import Template from "./Template";

class UserAgentTemplate {
    public static readonly template = "ua";

    public static getValue(identity: Identity): string {
        return identity.ua;
    }
}

Template.registerTemplate(
    UserAgentTemplate.template,
    UserAgentTemplate.getValue
);

export default UserAgentTemplate;
