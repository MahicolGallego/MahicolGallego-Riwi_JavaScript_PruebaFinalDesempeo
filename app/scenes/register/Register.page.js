import { navigateTo } from "../../Router";
import { emailValidator } from "../../helpers/emailValidator";

export function RegisterPage() {
  const $root = document.getElementById("root");
  $root.innerHTML = /*html*/ `
    <form>
        <label>Nombre de usuario:</label><br>
        <input type="text" placeholder="Nombre de usuario por favor..." value="mahicol" required><br><br>
        <label>Fecha de nacimiento:</label><br>
        <input type="date" required><br><br>
        <label>Correo electronico:</label><br>
        <input type="email" placeholder="example@gmail.com..." value="maicol@gmail.com" required><br><br>
        <!-- Pruebas de la funcion emailValidator() -->
        <!-- <input type="text" placeholder="example@gmail.com..." value="maicol@gmail.com" required><br><br> -->
        <label>Digita la contraseña</label><br>
        <input type="password" placeholder="Digita tu contraseña..." value="12345" required><br><br>
        <button type="submit">Registrarme</button>
    </form>
    `;

  //logic

  const $myRegisterForm = document.getElementsByTagName("form")[0];
  $myRegisterForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const $userName = document.querySelector('[type="text"]').value;
    const $userBirthdate = document.querySelector('[type="date"]').value;
    const $userEmail = document.getElementsByTagName("input")[2].value;
    const $userPassword = document.querySelector('[type="password"]').value;

    console.log($userName, $userEmail, $userBirthdate, $userPassword);

    const validEmail = emailValidator($userEmail);

    if (!validEmail) {
      return;
    }

    // Registrar los datos en la db.json

    const registerUser = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/jsons",
      },
      body: JSON.stringify({
        name: $userName,
        birthdate: $userBirthdate.toString(),
        email: $userEmail,
        password: $userPassword,
        roleId: 2,
      }),
    });

    if (!registerUser.ok) {
      alert("Error al crear el usuario");
      return;
    }

    alert("El usuario ha sido creado");

    navigateTo("/login");
  });
}
