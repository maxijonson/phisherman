import Chance from "chance";
import generator from "generate-password";

/**
 * f - first name \
 * s - first initial \
 *
 * l - last name \
 * e - last initial \
 *
 * n - number \
 * y - year of birth \
 *
 * c - complex password from generate-password \
 * w - word \
 */
const PASSWORD_PATTERN = [
    "fn",
    "fy",

    "ln",
    "ly",

    "sln",
    "sly",

    "fen",
    "fey",

    "wn",
    "wy",

    "c",
] as const;

const rand = new Chance();

const leet: { [key: string]: string[] } = {
    a: ["@", "4"],
    b: ["8"],
    c: ["(", "{", "[", "<"],
    e: ["3"],
    g: ["6", "9"],
    i: ["1", "!", "|"],
    o: ["0"],
    s: ["$", "5"],
    t: ["7"],
    z: ["2"],
};

const leetLify = (str: string) => {
    let leetStr = "";

    for (let i = 0; i < str.length; i++) {
        const char = str[i];

        if (leet[char]) {
            leetStr += rand.pickone(leet[char]);
        } else {
            leetStr += char;
        }
    }

    return leetStr;
};

export default (firstName: string, lastName: string, year: number) => {
    const pattern = rand.pickone<typeof PASSWORD_PATTERN[number]>([
        ...PASSWORD_PATTERN,
    ]);

    let password = "";

    for (let i = 0; i < pattern.length; i++) {
        const char = pattern[i];

        switch (char) {
            case "f":
                password += firstName;
                break;
            case "s":
                password += firstName[0];
                break;
            case "l":
                password += lastName;
                break;
            case "e":
                password += lastName[0];
                break;
            case "n":
                password += rand.natural({ min: 0, max: 9999 });
                break;
            case "y":
                password += year;
                break;
            case "c":
                password += generator.generate({
                    length: rand.natural({ min: 14, max: 32 }),
                    numbers: true,
                    symbols: true,
                    uppercase: true,
                    lowercase: true,
                    strict: true,
                });
                break;
            case "w":
                password += rand.word({
                    length: rand.natural({ min: 8, max: 20 }),
                });
                break;
            default:
                password += char;
        }
    }

    if (rand.bool({ likelihood: 20 })) {
        password = leetLify(password);
    }

    return password;
};
