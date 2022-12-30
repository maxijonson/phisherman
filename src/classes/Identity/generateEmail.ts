import Chance from "chance";
import removeSpecialChars from "../../utils/removeSpecialChars";

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
 * u - username \
 */
const EMAIL_PATTERNS = [
    "fl",
    "fln",
    "fl.n",
    "fly",
    "fl.y",

    "f.l",
    "f.ln",
    "f.l.n",
    "f.ly",
    "f.l.y",

    "sl",
    "sln",
    "sl.n",
    "sly",
    "sl.y",

    "s.l",
    "s.ln",
    "s.l.n",
    "s.ly",
    "s.l.y",

    "fe",
    "fen",
    "fe.n",
    "fey",
    "fe.y",

    "f.e",
    "f.en",
    "f.e.n",
    "f.ey",
    "f.e.y",

    "lf",
    "lfn",
    "lf.n",
    "lfy",
    "lf.y",

    "l.f",
    "l.fn",
    "l.f.n",
    "l.fy",
    "l.f.y",

    "ls",
    "lsn",
    "ls.n",
    "lsy",
    "ls.y",

    "l.s",
    "l.sn",
    "l.s.n",
    "l.sy",
    "l.s.y",

    "ef",
    "efn",
    "ef.n",
    "efy",
    "ef.y",

    "e.f",
    "e.fn",
    "e.f.n",
    "e.fy",
    "e.f.y",

    "u",
    "un",
    "u.n",
    "uy",
    "u.y",
] as const;

const rand = new Chance();

export default (
    firstName: string,
    lastName: string,
    username: string,
    year: number
) => {
    const domain = rand.pickone([
        "gmail.com",
        "yahoo.com",
        "hotmail.com",
        "aol.com",
        rand.domain(),
    ]);

    const pattern = rand.pickone<typeof EMAIL_PATTERNS[number]>([
        ...EMAIL_PATTERNS,
    ]);

    let email = "";

    for (let i = 0; i < pattern.length; i++) {
        const char = pattern[i];

        switch (char) {
            case "f":
                email += firstName.toLowerCase();
                break;
            case "s":
                email += firstName[0].toLowerCase();
                break;
            case "l":
                email += lastName.toLowerCase();
                break;
            case "e":
                email += lastName[0].toLowerCase();
                break;
            case "n":
                email += rand.natural({ min: 0, max: 9999 });
                break;
            case "y":
                email += year;
                break;
            case "u":
                email += username.toLowerCase();
                break;
            default:
                email += char;
        }
    }

    return `${removeSpecialChars(email)}@${domain}`;
};
