import Identity from "../Identity/Identity";
import Template from "./Template";

class CreditCardShortTemplate {
    public static readonly template = "cc-short";

    public static getValue(identity: Identity): string {
        return identity.card.num;
    }
}

Template.registerTemplate(
    CreditCardShortTemplate.template,
    CreditCardShortTemplate.getValue
);

export default CreditCardShortTemplate;
