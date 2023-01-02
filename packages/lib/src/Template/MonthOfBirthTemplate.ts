import Identity from "../Identity/Identity";
import Template from "./Template";

class MonthOfBirthTemplate {
    public static readonly template = "month-of-birth";

    public static getValue(identity: Identity): string {
        return (identity.birthday.getMonth() + 1).toString();
    }
}

Template.registerTemplate(
    MonthOfBirthTemplate.template,
    MonthOfBirthTemplate.getValue
);

export default MonthOfBirthTemplate;
