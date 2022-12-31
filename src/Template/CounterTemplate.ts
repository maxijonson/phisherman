import Template from "./Template";

class CounterTemplate extends Template {
    private static counter = 1;
    public static readonly template = "i";

    public static getValue(): string {
        return (CounterTemplate.counter++).toString();
    }
}

Template.registerTemplate(CounterTemplate.template, CounterTemplate.getValue);

export default CounterTemplate;
