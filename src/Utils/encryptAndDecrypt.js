import CryptoJS from "crypto-js";

const key = CryptoJS.enc.Hex.parse(process.env.CIPHER_KEY);
const iv = CryptoJS.enc.Hex.parse(process.env.CIPHER_IV);

export const encrypt = (text) => {

    const encrypted = CryptoJS.RC4.encrypt(text, key, { iv: iv }).toString();
    return encrypted.toString()
}

export const  decrypt = (encrypted) => {
  try {
    const decrypted = CryptoJS.RC4.decrypt(encrypted,key, { iv: iv });
    return decrypted.toString(CryptoJS.enc.Utf8)
  } catch (error) {
      return ""
  }
}
