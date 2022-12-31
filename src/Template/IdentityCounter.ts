import Identity from "../Identity/Identity";
import Template from "./Template";

class IdentityCounterTemplate extends Template {
    private static counters = new Map<string, number>();
    public static readonly template = "j";

    public static getValue(identity: Identity): string {
        if (!IdentityCounterTemplate.counters.has(identity.id)) {
            IdentityCounterTemplate.counters.set(identity.id, 1);
            return "1";
        }

        const counter = IdentityCounterTemplate.counters.get(identity.id)!;
        IdentityCounterTemplate.counters.set(identity.id, counter + 1);
        return counter.toString();
    }
}

Template.registerTemplate(
    IdentityCounterTemplate.template,
    IdentityCounterTemplate.getValue
);

export default IdentityCounterTemplate;
