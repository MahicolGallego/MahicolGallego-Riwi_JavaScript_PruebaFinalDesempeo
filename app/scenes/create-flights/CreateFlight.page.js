export function CreateFlightsPage() {
  const $content = /*html*/ `
        <form>
        <label>Numero de vuelo:</label><br>
        <input type="text" maxlength="20" value="283" required><br><br>
        <label>Aeropuerto:</label><br>
        <input type="text" placeholder="indica el aeropuerto.." maxlength="50" value="jfk" required><br><br>
        <label>Lugar de destino:</label><br>
        <input type="text" placeholder="indica el destino.."  maxlength="50" value="miami" required><br><br>
        <label>Fecha y hora de salida del vuelo:</label><br>
        <input type="datetime-local" required><br><br>
        <label>Fecha y hora de llegada del vuelo al destino:</label><br>
        <input type="datetime-local" required><br><br>
        <label>Capacidad de pasajeros:</label><br>
        <input type="number" required><br><br>

        <button type="submit">Crear vuelo</button>
    </form>
    `;

  const logic = () => {
    const $myCreateFlightForm = document.querySelector("form");
    $myCreateFlightForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const $flightNumber = document.querySelectorAll("[type='text']")[0].value;
      const $flightOrigin = document.querySelectorAll("[type='text']")[1].value;
      const $flightDestination =
        document.querySelectorAll("[type='text']")[2].value;
      const $flightDeparture = document.querySelectorAll(
        "[type='datetime-local']"
      )[0].value;
      const $flightArrival = document.querySelectorAll(
        "[type='datetime-local']"
      )[1].value;
      const $flightCapacity =
        document.querySelectorAll("[type='number']")[0].value;

      //   console.log(
      //     $flightArrival,
      //     $flightCapacity,
      //     $flightDeparture,
      //     $flightDestination,
      //     $flightNumber,
      //     $flightOrigin
      //   );

      const registerFlight = await fetch("http://localhost:3000/flights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: $flightNumber,
          origin: $flightOrigin,
          destination: $flightDestination,
          departure: $flightDeparture,
          arrival: $flightArrival,
          capacity: $flightCapacity,
        }),
      });
      if (!registerFlight.ok) {
        alert("Error al crear el vuelo");
        return;
      }
      alert("el vuelo ha sido registrado");
    });
  };

  return {
    $content,
    logic,
  };
}
