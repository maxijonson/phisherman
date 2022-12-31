import Identity from "../Identity/Identity";
import Template from "./Template";

class ExpMonthTemplate extends Template {
    public static readonly template = "exp-month";

    public static getValue(identity: Identity): string {
        return identity.card.expMonth;
    }
}

Template.registerTemplate(ExpMonthTemplate.template, ExpMonthTemplate.getValue);

export default ExpMonthTemplate;
