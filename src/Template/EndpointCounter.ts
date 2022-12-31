import { Endpoint } from "../Config/schema";
import Identity from "../Identity/Identity";
import Template from "./Template";

type IdentityId = string;
type EndpointPath = string;

class EndpointCounterTemplate extends Template {
    private static counters = new Map<IdentityId, Map<EndpointPath, number>>();
    public static readonly template = "k";

    public static getValue(identity: Identity, endpoint: Endpoint): string {
        const identityId = identity.id;
        const endpointPath = endpoint.path;

        if (!EndpointCounterTemplate.counters.has(identityId)) {
            EndpointCounterTemplate.counters.set(identityId, new Map());
            EndpointCounterTemplate.counters
                .get(identityId)!
                .set(endpoint.path, 1);
            return "1";
        }

        const identityCounters =
            EndpointCounterTemplate.counters.get(identityId)!;

        if (!identityCounters.has(endpointPath)) {
            identityCounters.set(endpointPath, 1);
            return "1";
        }

        const counter = identityCounters.get(endpointPath)!;
        identityCounters.set(endpointPath, counter + 1);
        return counter.toString();
    }
}

Template.registerTemplate(
    EndpointCounterTemplate.template,
    EndpointCounterTemplate.getValue
);

export default EndpointCounterTemplate;
