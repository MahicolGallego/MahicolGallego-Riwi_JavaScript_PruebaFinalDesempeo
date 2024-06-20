export function emailValidator(emailToValidate) {
  const emailSplit = emailToValidate.split("@");
  if (emailSplit.length < 2) {
    alert("El email no cumple con el formato requerido");
    return false;
  }

  const hadDotAfterAt = emailSplit[1].includes(".");

  if (!hadDotAfterAt) {
    alert("El email no cumple con el formato requerido");
    return false;
  }

  return true;
}
