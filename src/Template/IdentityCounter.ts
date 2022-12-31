import Template from "./Template";

class IdentityCounterTemplate extends Template {
    private static counter = 1;
    public static readonly template = "j";

    public static getValue(): string {
        return (IdentityCounterTemplate.counter++).toString();
    }

    public static resetCounter(): void {
        IdentityCounterTemplate.counter = 1;
    }
}

Template.registerTemplate(
    IdentityCounterTemplate.template,
    IdentityCounterTemplate.getValue
);

export default IdentityCounterTemplate;
