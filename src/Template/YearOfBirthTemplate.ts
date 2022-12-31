import Identity from "../Identity/Identity";
import Template from "./Template";

class YearOfBirthTemplate extends Template {
    public static readonly template = "year-of-birth";

    public static getValue(identity: Identity): string {
        return identity.birthday.getFullYear().toString();
    }
}

Template.registerTemplate(
    YearOfBirthTemplate.template,
    YearOfBirthTemplate.getValue
);

export default YearOfBirthTemplate;
