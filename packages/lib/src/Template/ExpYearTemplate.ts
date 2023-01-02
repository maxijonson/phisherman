import Identity from "../Identity/Identity";
import Template from "./Template";

class ExpYearTemplate {
    public static readonly template = "exp-year";

    public static getValue(identity: Identity): string {
        return identity.card.expYear;
    }
}

Template.registerTemplate(ExpYearTemplate.template, ExpYearTemplate.getValue);

export default ExpYearTemplate;
