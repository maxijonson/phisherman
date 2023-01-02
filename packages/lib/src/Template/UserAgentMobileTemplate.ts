import Identity from "../Identity/Identity";
import Template from "./Template";

class UserAgentMobileTemplate {
    public static readonly template = "ua-mobile";

    public static getValue(identity: Identity): string {
        return identity.uaMobile;
    }
}

Template.registerTemplate(
    UserAgentMobileTemplate.template,
    UserAgentMobileTemplate.getValue
);

export default UserAgentMobileTemplate;
