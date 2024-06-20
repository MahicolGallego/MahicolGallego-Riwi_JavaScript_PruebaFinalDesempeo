export function getUserFromLocalStorage() {
  const userInLocalStorage = localStorage.getItem("user");
  if (!userInLocalStorage) {
    console.error("No existe la entidad usuario en el localStorage");
    return;
  }

  const userJs = JSON.parse(userInLocalStorage);

  return userJs;
}
