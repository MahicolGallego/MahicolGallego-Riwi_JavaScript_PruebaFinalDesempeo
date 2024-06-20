export function NotFoundPage() {
  const $root = document.getElementById("root");
  // const $myDiv = document.createElement("DIV");
  // $myDiv.textContent = "Hola mundo. Error: page not found";
  $root.innerHTML = /*html*/ `
    <div><p>error 404: pagina no encontrada</p></div>
    `;
  // $root.appendChild($myDiv);
}
