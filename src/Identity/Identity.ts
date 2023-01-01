import UserAgent from "user-agents";
import rand from "../utils/rand";
import generateEmail from "./generateEmail";
import generatePassword from "./generatePassword";
import generateUsername from "./generateUsername";

interface CreditCard {
    num: string;
    expMonth: string;
    expYear: string;
    cvv: string;
    type: string;
}

class Identity {
    public readonly id: string;
    public readonly gender: "male" | "female";
    public readonly firstName: string;
    public readonly lastName: string;
    public readonly birthday: Date;
    public readonly address: {
        num: number;
        street: string;
        city: string;
        country: "ca" | "us";
        state: string; // or province
        zip: string; // or postal code
    };
    public readonly phone: string;
    public readonly username: string;
    public readonly email: string;
    public readonly password: string;
    public readonly mmn: string;
    public readonly ssn: string;
    public readonly visa: CreditCard;
    public readonly mastercard: CreditCard;
    public readonly card: CreditCard;
    public readonly ua: string;
    public readonly uaDesktop: string;
    public readonly uaMobile: string;

    constructor() {
        this.id = rand.guid();
        this.gender = rand.pickone(["male", "female"]);
        this.firstName = rand.first({ gender: this.gender });
        this.lastName = rand.last();
        this.birthday = rand.birthday({ type: "adult", string: false }) as Date;

        const country = rand.pickone<"ca" | "us">(["ca", "us"]);
        this.address = {
            num: rand.natural({ min: 1, max: 999 }),
            street: rand.street(),
            city: rand.city(),
            country,
            state: country === "ca" ? rand.province() : rand.state(),
            zip: country === "ca" ? rand.postal() : rand.zip(),
        };

        this.phone = rand.phone({ country: "us" });
        this.username = generateUsername(
            this.firstName,
            this.lastName,
            this.birthday.getFullYear()
        );
        this.email = generateEmail(
            this.firstName,
            this.lastName,
            this.username,
            this.birthday.getFullYear()
        );
        this.password = generatePassword(
            this.firstName,
            this.lastName,
            this.birthday.getFullYear()
        );
        this.mmn = rand.last();
        this.ssn = rand.ssn({ dashes: false });

        const visaExp = rand.exp({ raw: true }) as {
            month: string;
            year: string;
        };
        const mastercardExp = rand.exp({ raw: true }) as {
            month: string;
            year: string;
        };

        this.visa = {
            num: rand.cc({ type: "Visa" }),
            expMonth: visaExp.month,
            expYear: visaExp.year,
            cvv: rand.natural({ min: 100, max: 999 }).toString(),
            type: "Visa",
        };
        this.mastercard = {
            num: rand.cc({ type: "Mastercard" }),
            expMonth: mastercardExp.month,
            expYear: mastercardExp.year,
            cvv: rand.natural({ min: 100, max: 999 }).toString(),
            type: "Mastercard",
        };
        this.card = rand.pickone([this.visa, this.mastercard]);
        this.ua = new UserAgent().toString();
        this.uaDesktop = new UserAgent({
            deviceCategory: "desktop",
        }).toString();
        this.uaMobile = new UserAgent({
            deviceCategory: "mobile",
        }).toString();
    }
}

export default Identity;
