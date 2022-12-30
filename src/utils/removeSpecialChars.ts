export default (str: string) => {
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
        const char = str[i];

        if (char.match(/[a-zA-Z0-9]/)) {
            newStr += char;
        } else if ([".", "-", "_", "+"].includes(char)) {
            newStr += char;
        }
    }
    return newStr;
};
