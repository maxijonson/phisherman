import Identity from "../Identity/Identity";
import Template from "./Template";

class CreditCardTypeTemplate extends Template {
    public static readonly template = "cc-type";

    public static getValue(identity: Identity): string {
        return identity.card.type;
    }
}

Template.registerTemplate(
    CreditCardTypeTemplate.template,
    CreditCardTypeTemplate.getValue
);

export default CreditCardTypeTemplate;
