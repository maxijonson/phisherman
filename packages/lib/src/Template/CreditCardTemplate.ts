import Identity from "../Identity/Identity";
import Template from "./Template";

class CreditCardTemplate extends Template {
    public static readonly template = "cc";

    public static getValue(identity: Identity): string {
        return identity.card.num.replace(/(.{4})/g, "$1 ").slice(0, -1);
    }
}

Template.registerTemplate(
    CreditCardTemplate.template,
    CreditCardTemplate.getValue
);

export default CreditCardTemplate;
