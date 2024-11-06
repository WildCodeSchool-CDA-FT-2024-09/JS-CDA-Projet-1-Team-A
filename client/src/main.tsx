import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CharacterProvider } from "./contexts/CharacterContext";
import App from "./App.tsx";
import "./index.css";
import client from "./services/connexion.ts";
import HomePage from "./pages/HomePage.tsx";
import RulesPage from "./pages/RulesPage.tsx";
import AboutUsPage from "./pages/AboutUsPage.tsx";
import CreateCharacterPage from "./pages/CreateCharacterPage.tsx";
import StatisticsPage from "./pages/StatisticsPage.tsx";
import ChooseGodPage from "./pages/ChooseGodPage.tsx";
import StartTrialPage from "./pages/StartTrialPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/creation-du-personnage",
        element: <CreateCharacterPage />,
      },
      {
        path: "/choix-du-dieu",
        element: <ChooseGodPage />,
      },
      {
        path: "/regles",
        element: <RulesPage />,
      },
      {
        path: "/a-propos",
        element: <AboutUsPage />,
      },
      {
        path: "/statistiques",
        element: <StatisticsPage />,
      },
      {
        path: "/epreuve",
        element: <StartTrialPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <CharacterProvider>
        <RouterProvider router={router} />
      </CharacterProvider>
    </ApolloProvider>
  </StrictMode>
);
