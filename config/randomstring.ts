
export const randomstring = (length: number) => {
    let string = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
    let lengthStr = string.length;
    let resultStr = "";

    for (let i = 0; i < length; i++) {
        let index = Math.floor(Math.random() * lengthStr);
        resultStr += string.charAt(index);
    }

    return resultStr;
}