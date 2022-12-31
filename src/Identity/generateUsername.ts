import { generateUsername } from "unique-username-generator";
import rand from "../utils/rand";
import removeSpecialChars from "../utils/removeSpecialChars";

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
 * u - username from unique-username-generator \
 * w - word \
 */
const USER_PATTERNS = [
    "fln",
    "fly",

    "sln",
    "sly",

    "fen",
    "fey",

    "lfn",
    "lfy",

    "lsn",
    "lsy",

    "efn",
    "efy",

    "w",
    "wn",
    "wy",

    "u",
    "un",
    "uy",
] as const;

export default (firstName: string, lastName: string, year: number) => {
    const pattern = rand.pickone<typeof USER_PATTERNS[number]>([
        ...USER_PATTERNS,
    ]);

    let username = "";

    for (let i = 0; i < pattern.length; i++) {
        const char = pattern[i];

        switch (char) {
            case "f":
                username += firstName.toLowerCase();
                break;
            case "s":
                username += firstName[0].toLowerCase();
                break;
            case "l":
                username += lastName.toLowerCase();
                break;
            case "e":
                username += lastName[0].toLowerCase();
                break;
            case "n":
                username += rand.natural({ min: 0, max: 9999 });
                break;
            case "y":
                username += year;
                break;
            case "u":
                username += generateUsername("", 0);
                break;
            case "w":
                username += rand.word({
                    length: rand.natural({ min: 6, max: 12 }),
                });
                break;
            default:
                username += char;
        }
    }

    return removeSpecialChars(username);
};
