import Identity from "../Identity/Identity";
import Template from "./Template";

class UserAgentDesktopTemplate {
    public static readonly template = "ua-desktop";

    public static getValue(identity: Identity): string {
        return identity.uaDesktop;
    }
}

Template.registerTemplate(
    UserAgentDesktopTemplate.template,
    UserAgentDesktopTemplate.getValue
);

export default UserAgentDesktopTemplate;
