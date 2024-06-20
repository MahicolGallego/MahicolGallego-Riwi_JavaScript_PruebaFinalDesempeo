import CryptoJS from "crypto-js";

export function encryptData(data, key = "123") {
  return CryptoJS.AES.encrypt(data, key).toString();
}

export function decryptData(encryptedData, key = "123") {
  const decryptedData = CryptoJS.AES.decrypt(encryptedData, key).toString(
    CryptoJS.enc.Utf8
  );
  return decryptData;
}
