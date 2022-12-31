import Identity from "../Identity/Identity";
import Template from "./Template";

class MotherMaidenNameTemplate extends Template {
    public static readonly template = "mother-maiden-name";

    public static getValue(identity: Identity): string {
        return identity.mmn;
    }
}

Template.registerTemplate(
    MotherMaidenNameTemplate.template,
    MotherMaidenNameTemplate.getValue
);

export default MotherMaidenNameTemplate;
