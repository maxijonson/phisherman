import Identity from "../Identity/Identity";
import Template from "./Template";

class EmailTemplate {
    public static readonly template = "email";

    public static getValue(identity: Identity): string {
        return identity.email;
    }
}

Template.registerTemplate(EmailTemplate.template, EmailTemplate.getValue);

export default EmailTemplate;
