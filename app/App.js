import { Router } from "./Router";

export function App() {
  //   console.log("Hola mundo desde App");

  const $root = document.getElementById("root");

  if (!$root) {
    throw new Error("Hay un error no se encuantra root");
  }

  //El router es quien me va a controlar hacia donde van a dirigirse
  //cuando deseen acceder a algo(/login, /register, /home, etc...)
  Router();
}
