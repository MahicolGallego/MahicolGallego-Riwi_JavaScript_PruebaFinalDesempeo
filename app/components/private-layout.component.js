import { navigateTo } from "../Router";
import { getUserFromLocalStorage } from "../helpers/getUserFromLocalStorage";

export function dashboardLayout($content, logic) {
  //Obtenemos el usuario logueado del local storage
  const userLoggedIn = getUserFromLocalStorage();

  //obtenemos el root para plasmar el contenido
  const $root = document.getElementById("root");

  //diseñamos el nav y lo incrustamos, debajo
  const $nav = /*html*/ `
    <ul>
        <li><a href="/reservar">Reservar</a></li>
        <li><a href="/logout">LogOut</a></li>
    </ul><br><br>
    <p>Bienvenido ${userLoggedIn.name.toUpperCase()}</p>
    `;

  //incrustamos el nav y el contenido de las
  //pages que se pasara como argumento
  $root.innerHTML = /*html*/ `
  ${$nav}
  ${$content}
  `;

  //Ejecutamos la Logic de las pages que se pasara como argumento
  logic();

  //Tomamos el boton para cerrar la sesion
  const $anchorLogOut = document.querySelector("[href='/logout']");

  //Evento para cerrar la sesion
  $anchorLogOut.addEventListener("click", (e) => {
    //Prevenimos que se recargue el sitio
    e.preventDefault();
    //bajamos el token para remover la sesion
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    //redirigimos al login
    navigateTo("/login");
  });
}
