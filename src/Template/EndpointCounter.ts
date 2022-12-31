import Template from "./Template";

class EndpointCounterTemplate extends Template {
    private static counter = 1;
    public static readonly template = "k";

    public static getValue(): string {
        return (EndpointCounterTemplate.counter++).toString();
    }

    public static resetCounter(): void {
        EndpointCounterTemplate.counter = 1;
    }
}

Template.registerTemplate(
    EndpointCounterTemplate.template,
    EndpointCounterTemplate.getValue
);

export default EndpointCounterTemplate;
