import Identity from "../Identity/Identity";
import Template from "./Template";

class MastercardCardTemplate extends Template {
    public static readonly template = "cc-mastercard";

    public static getValue(identity: Identity): string {
        return identity.mastercard.num.replace(/(.{4})/g, "$1 ").slice(0, -1);
    }
}

Template.registerTemplate(
    MastercardCardTemplate.template,
    MastercardCardTemplate.getValue
);

export default MastercardCardTemplate;
