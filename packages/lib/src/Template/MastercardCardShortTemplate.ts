import Identity from "../Identity/Identity";
import Template from "./Template";

class MastercardCardShortTemplate extends Template {
    public static readonly template = "cc-mastercard-short";

    public static getValue(identity: Identity): string {
        return identity.mastercard.num;
    }
}

Template.registerTemplate(
    MastercardCardShortTemplate.template,
    MastercardCardShortTemplate.getValue
);

export default MastercardCardShortTemplate;
