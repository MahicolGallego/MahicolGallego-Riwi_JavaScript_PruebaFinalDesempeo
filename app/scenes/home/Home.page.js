import { navigateTo } from "../../Router";
import { getUserFromLocalStorage } from "../../helpers/getUserFromLocalStorage";

export function HomePage() {
  const userRoles = {
    administrator: "1",
    visitor: "2",
  };
  const userLoggedIn = getUserFromLocalStorage();

  // console.log(userRoles);
  // console.log("usuario logueado", userLoggedIn);

  let $content = /*html*/ `
      <h1>Todos los vuelos</h1>
      <div id="all-flights"></div>
      <div id="all-bookings"></div>
  `;

  let logic = async () => {
    const $containerFlights = document.getElementById("all-flights");
    $containerFlights.innerHTML = ``;

    //Solicitamos todos los vuelos

    const fetchAllFlights = await fetch("http://localhost:3000/flights");

    const dataJsonFlights = await fetchAllFlights.json();

    // Solicitamos todas las reservas en general

    // const fetchAllBookings = await fetch(`http://localhost:3000/bookings`);

    // const dataJsonBookings = await fetchAllBookings.json();

    // console.log(dataJsonBookings);

    //Solicitamos todas las reservas del usuario

    const fetchAllBookingsAndFlightsByUser = await fetch(
      `http://localhost:3000/bookings?userId=${userLoggedIn.id}&_embed=flight`
    );

    const dataJsonBookingsAndFlightsByUser =
      await fetchAllBookingsAndFlightsByUser.json();

    console.log(dataJsonBookingsAndFlightsByUser);

    // Creamos el fragmento

    const $myFragment = document.createDocumentFragment();

    for (let flight of dataJsonFlights) {
      const $newCardFlight = document.createElement("DIV");
      $newCardFlight.classList.add("flight_card");
      $newCardFlight.innerHTML += /*html*/ `
            <p>Numero de vuelo: ${flight.number}</p>
            <p>Aeropuerto: ${flight.origin}</p>
            <p>Con destino a: ${flight.destination}</p>
            <p>Fecha y hora de partida: ${flight.departure}</p>
            <p>Fecha y hora de llegada al destino: ${flight.arrival}</p>
            <p>Capacidad: ${flight.capacity}</p>
            `;

      // Administrator------------------------------
      if (userRoles.administrator === userLoggedIn.roleId) {
        $newCardFlight.innerHTML += /*html*/ `
          <button class="btn-edit" data-flightid="${flight.id}">Editar vuelo</button>
          <button class="btn-delete" data-flightid="${flight.id}">Eliminar vuelo</button>`;
      }

      // Visitor------------------------------
      if (userRoles.visitor === userLoggedIn.roleId) {
        const bookingsByflight = await fetch(
          `http://localhost:3000/bookings?flightId=${flight.id}`
        );

        const dataJsonBookingsByFlight = await bookingsByflight.json();

        // console.log("hola", dataJsonBookingsByFlight);

        if (
          dataJsonBookingsByFlight &&
          dataJsonBookingsByFlight.length < flight.capacity
        ) {
          $newCardFlight.innerHTML += /*html*/ `
          <button class="btn-booking" data-flightid="${flight.id}">Reservar vuelo</button>
          `;
        } else {
          $newCardFlight.innerHTML += /*html*/ `
          <button disabled>Sold Out!</button>
          `;
        }
      }

      $myFragment.appendChild($newCardFlight);
    }
    // console.log($myFragment, $containerFlights);
    $containerFlights.appendChild($myFragment);
    // console.log("ya añadi", $myFragment, $containerFlights);

    //Retomamos la tarjeta que acabamos de crear para añadir segun sea el rol
    //y necesidades (siempre la ultima)

    // const $flightCards = document.querySelectorAll(".flight_card");
    // const $currentFlightCard = $flightCards[$flightCards.length - 1];

    if (userRoles.administrator === userLoggedIn.roleId) {
      $containerFlights.innerHTML += /*html*/ `
          <br>
          <button id="btn-create">Crear un nuevo vuelo</button>
          `;

      //tomamos los botones correspondientes

      const $btnCreate = document.getElementById("btn-create");
      const $btnsEdit = document.querySelectorAll(".btn-edit");
      const $btnsDelete = document.querySelectorAll(".btn-delete");

      //Agregamos los eventos para ir a la Page de
      //crear nuevo vuelo

      $btnCreate.addEventListener("click", () => {
        navigateTo("/create-flights");
      });

      // Agregamos los eventos del boton editar, para que
      // lo mande a create-flights y su debido id

      $btnsEdit.forEach(($btnEdit) => {
        $btnEdit.addEventListener("click", () => {
          navigateTo(`/edit-flights?flightId=${$btnEdit.dataset.flightid}`);
        });
      });

      //Agregamos los eventos de eliminar,
      //eliminando basado en su debido id

      $btnsDelete.forEach(($btnDelete) => {
        $btnDelete.addEventListener("click", async () => {
          const confirmDelete = confirm("Eliminar el vuelo disponible");
          if (confirmDelete) {
            const fetchToDelete = await fetch(
              `http://localhost:3000/flights/${$btnDelete.dataset.flightid}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (!fetchToDelete.ok) {
              alert("Error al eliminar el vuelo disponible");
              return;
            }

            alert("Vuelo Eliminado");

            navigateTo("/");
          }
        });
      });
    }

    if (userRoles.visitor === userLoggedIn.roleId) {
      //verificamos si hay reservaciones hechas por el usuario activo
      //Si si, las mostramos

      if (dataJsonBookingsAndFlightsByUser) {
        //Añadimos el div para las reservas

        const $containerBookings = document.getElementById("all-bookings");
        $containerBookings.innerHTML += /*html*/ `
              <h1>Mis Reservas</h1>
        `;

        dataJsonBookingsAndFlightsByUser.forEach((bookingByUser) => {
          $containerBookings.innerHTML += /*html*/ `
          <div>
            <p>Numero de vuelo: ${bookingByUser.flight.number}</p>
            <p>Aeropuerto: ${bookingByUser.flight.origin}</p>
            <p>Con destino a: ${bookingByUser.flight.destination}</p>
            <p>Fecha y hora de partida: ${bookingByUser.flight.departure}</p>
            <p>Fecha y hora de llegada al destino: ${bookingByUser.flight.arrival}</p>
            <p>Fecha en que se realizo la reserva: ${bookingByUser.bookingdate}</p>
          </div><br>
          `;
        });
      }

      //tomamos los botones correspondientes
      const $btnsBooking = document.querySelectorAll(".btn-booking");
      console.log($btnsBooking);
      //Agregamos los eventos de registrar reserva

      $btnsBooking.forEach(($btnBooking) => {
        $btnBooking.addEventListener("click", async () => {
          const confirmBooking = confirm(
            "Seguro que deseas realizar la reservar"
          );
          if (confirmBooking) {
            //Primero obtenemos la fecha actual, la cual siempre
            //cambiara segun el dia de la reserva

            const currentDate = new Date().toISOString().split("T")[0];

            const fetchToBooking = await fetch(
              `http://localhost:3000/bookings`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  flightId: $btnBooking.dataset.flightid,
                  userId: userLoggedIn.id,
                  bookingdate: currentDate,
                }),
              }
            );

            if (!fetchToBooking.ok) {
              alert("Error registrar la reserva");
              return;
            }

            alert("Reserva realizada");

            navigateTo("/");
          }
        });
      });
    }
  };

  return {
    $content,
    logic,
  };
}
