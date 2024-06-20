import { navigateTo } from "../../Router";

export function LoginPage() {
  const $root = document.getElementById("root");

  $root.innerHTML = /*html*/ `
    <form action="">
        <input type="email" placeholder="example@gmail.com..." value="maicol@gmail.com" required>
        <input type="password" placeholder="Digita tu contraseña..." value="12345" required>
        <button type="submit">Iniciar sesion</button>
    </form>
    `;

  //logic

  const $myLoginForm = document.getElementsByTagName("form")[0];
  $myLoginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const $userEmail = document.getElementsByTagName("input")[0].value;
    const $userPassword = document.querySelector('[type="password"]').value;

    // if (!$userEmail || !$userPassword) alert("todos los campos son requeridos");

    //Obtenemos los usuarios registrados

    const usersFetched = await fetch("http://localhost:3000/users");

    if (!usersFetched.ok) alert("Error al inicar sesion ");

    const usersToJson = await usersFetched.json();

    // console.log(usersToJson);

    const userFound = usersToJson.find(
      (user) =>
        user.email === $userEmail.toLowerCase() &&
        user.password === $userPassword
    );

    // console.log(usersToJson, userFound);

    if (!userFound) {
      return alert("usuario o contraseña errados");
    }

    const token = Math.random().toString(36).substring(2);
    localStorage.setItem("token", token);
    // tambien subimos el user para hacer mas practicidad
    // y no hacer gets y comparaciones de mas
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: userFound.id,
        name: userFound.name,
        birthdate: userFound.birthdate,
        email: userFound.email,
        roleId: userFound.roleId,
      })
    );
    // console.log(localStorage.getItem("token"));
    navigateTo("/");
  });
}
