const CryptoJS = require("crypto-js");

 const hashPassword = (password) => {
    const hashedPass = CryptoJS.AES.encrypt(
                password,
                "yamahaderbyhash0984687638763021089874"
            ).toString();
    return hashedPass;
};

 const unHashPassword = (password) => {
    const hashedPassword = CryptoJS.AES.decrypt(
        password,
        "yamahaderbyhash0984687638763021089874"
    );
    const decryptedPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    console.log(decryptedPassword.toString());
    return decryptedPassword;
};

unHashPassword("password");