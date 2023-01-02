import Identity from "../Identity/Identity";
import Template from "./Template";

class DayOfBirthTemplate extends Template {
    public static readonly template = "day-of-birth";

    public static getValue(identity: Identity): string {
        return identity.birthday.getDate().toString();
    }
}

Template.registerTemplate(
    DayOfBirthTemplate.template,
    DayOfBirthTemplate.getValue
);

export default DayOfBirthTemplate;
