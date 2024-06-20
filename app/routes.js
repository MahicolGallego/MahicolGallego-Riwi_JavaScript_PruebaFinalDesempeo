import { CreateFlightsPage } from "./scenes/create-flights/CreateFlight.page";
import { EditFlightsPage } from "./scenes/edit-flights/editFlight.page";
import { HomePage } from "./scenes/home/Home.page";
import { NotFoundPage } from "./scenes/not-found/Not-found.page";
import { RegisterPage } from "./scenes/register";
import { LoginPage } from "./scenes/Login";

export const routes = {
  public: [
    {
      path: "/register",
      page: RegisterPage,
    },
    {
      path: "/login",
      page: LoginPage,
    },
    {
      path: "/not-found",
      page: NotFoundPage,
    },
  ],
  private: [
    {
      path: "/",
      page: HomePage,
    },

    {
      path: "/create-flights",
      page: CreateFlightsPage,
    },

    {
      path: "/edit-flights",
      page: EditFlightsPage,
    },
  ],
};
