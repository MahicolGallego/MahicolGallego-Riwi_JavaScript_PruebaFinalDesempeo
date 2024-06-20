import { dashboardLayout, privateLayout } from "./components";
import { getUserFromLocalStorage } from "./helpers/getUserFromLocalStorage";
import { routes } from "./routes";

export async function Router() {
  //   console.log("Hola, desde el Router");

  // Roles de usuario para validaciones
  const userRoles = {
    administrator: 1,
    visitor: 2,
  };

  //obtenemos usuarios para verificar y bloquear el
  //acceso de visitor a ciertas paginas

  const userLoggedIn = getUserFromLocalStorage();

  //   console.log(window.location.pathname);

  //obtenemos el path actual(al que quiere ir el usuario)
  const currentPath = window.location.pathname;

  //buscamos en las routes tanto publicas como privadas si existe a
  //la que el usuario quiere ir

  const publicRoute = routes.public.find((route) => {
    return route.path === currentPath;
  });

  const privateRoute = routes.private.find(
    (route) => route.path === currentPath
  );

  if (
    currentPath === "/login" ||
    currentPath === "/register" ||
    (currentPath === "/create-flights" &&
      userLoggedIn.roleid === userRoles.visitor) ||
    (currentPath === "/edit-flights" &&
      userLoggedIn.roleid === userRoles.visitor)
  ) {
    if (localStorage.getItem("token")) {
      //   console.log(localStorage.getItem("token"));
      navigateTo("/");
      return;
    }
  }

  //si la pagina existe muestra el sitio deseado
  if (publicRoute) {
    // console.log("holaaaa");
    publicRoute.page();
    return;
  }

  if (privateRoute) {
    if (!localStorage.getItem("token")) {
      navigateTo("/login");
      return;
    }
    const { $content, logic } = privateRoute.page();
    dashboardLayout($content, logic);
    return;
  }
  //Si la ruta no existe vamos al not found
  navigateTo("/not-found");
}

//realizamos nuestra funcion para utilizar otros apartados
//que es para navegar a...
export function navigateTo(path) {
  window.history.pushState({}, "", window.location.origin + path);
  Router();
}
