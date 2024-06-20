import { navigateTo } from "../../Router";

export function EditFlightsPage() {
  const $content = /*html*/ `
    <form>
        <label>Numero de vuelo:</label><br>
        <input type="text" readonly maxlength="20"required><br><br>
        <label>Aeropuerto:</label><br>
        <input type="text" placeholder="indica el aeropuerto.." readonly maxlength="50" required><br><br>
        <label>Lugar de destino:</label><br>
        <input type="text" placeholder="indica el destino.." readonly maxlength="50" required><br><br>
        <label>Fecha y hora de salida del vuelo:</label><br>
        <input type="datetime-local" required><br><br>
        <label>Fecha y hora de llegada del vuelo al destino:</label><br>
        <input type="datetime-local" required><br><br>
        <label>Capacidad de pasajeros:</label><br>
        <input type="number" required><br><br>
        <button type="submit">Guardar cambios</button>
    </form>
    `;
  const logic = async () => {
    const searchParams = window.location.search;
    // console.log(searchParams);
    const paramsConverted = new URLSearchParams(searchParams);
    // console.log(paramsConverted);

    const flightFetched = await fetch(
      `http://localhost:3000/flights/${paramsConverted.get("flightId")}`
    );

    const dataJson = await flightFetched.json();
    console.log(dataJson);

    const $myEditFlightForm = document.getElementsByTagName("form")[0];
    console.log($myEditFlightForm);

    const $flightNumber = document.querySelectorAll("[type='text']")[0];
    const $flightOrigin = document.querySelectorAll("[type='text']")[1];
    const $flightDestination = document.querySelectorAll("[type='text']")[2];
    const $flightDeparture = document.querySelectorAll(
      "[type='datetime-local']"
    )[0];
    const $flightArrival = document.querySelectorAll(
      "[type='datetime-local']"
    )[1];
    const $flightCapacity = document.querySelectorAll("[type='number']")[0];

    $flightNumber.value = dataJson.number;
    $flightOrigin.value = dataJson.origin;
    $flightDestination.value = dataJson.destination;
    $flightDeparture.value = dataJson.departure;
    $flightArrival.value = dataJson.arrival;
    $flightCapacity.value = dataJson.capacity;

    $myEditFlightForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const fetchToEdit = await fetch(
        `http://localhost:3000/flights/${paramsConverted.get("flightId")}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            departure: $flightDeparture.value,
            arrival: $flightArrival.value,
            capacity: $flightCapacity.value,
          }),
        }
      );

      if (!fetchToEdit.ok) {
        alert("Error al editar los datos");
        return;
      }

      alert("El registro se edito con exito");

      navigateTo("/");
    });
  };
  return {
    $content,
    logic,
  };
}
