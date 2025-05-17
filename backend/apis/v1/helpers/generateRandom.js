module.exports.generateRandomString = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrtuvwxyz0123456789"

    let res = "";
    for (let i = 0; i < length; i++) {
        res += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return res;
}

module.exports.generateRandomNumber = (length) => {
    const characters = "0123456789";

    let res = "";

    for (let i = 0; i < length; i++) {
        res += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return res;
}