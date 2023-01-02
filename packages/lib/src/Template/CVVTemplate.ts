import Identity from "../Identity/Identity";
import Template from "./Template";

class CVVTemplate extends Template {
    public static readonly template = "cvv";

    public static getValue(identity: Identity): string {
        return identity.card.cvv;
    }
}

Template.registerTemplate(CVVTemplate.template, CVVTemplate.getValue);

export default CVVTemplate;
