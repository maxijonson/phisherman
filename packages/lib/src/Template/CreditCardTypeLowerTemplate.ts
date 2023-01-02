import Identity from "../Identity/Identity";
import Template from "./Template";

class CreditCardTypeLowerTemplate extends Template {
    public static readonly template = "cc-type-lower";

    public static getValue(identity: Identity): string {
        return identity.card.type.toLowerCase();
    }
}

Template.registerTemplate(
    CreditCardTypeLowerTemplate.template,
    CreditCardTypeLowerTemplate.getValue
);

export default CreditCardTypeLowerTemplate;
