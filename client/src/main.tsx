import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import RulesPage from "./pages/RulesPage.tsx";
import AboutUsPage from "./pages/AboutUsPage.tsx";
import StartTrialPage from "./pages/StartTrialPage.tsx";

import App from "./App.tsx";
import "./index.css";

import client from "./services/connexion.ts";
import CreateCharacterPage from "./pages/CreateCharacterPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      { path: "/character-creation", element: <CreateCharacterPage /> },
      {
        path: "/rules",
        element: <RulesPage />,
      },
      {
        path: "/about",
        element: <AboutUsPage />,
      },
      {
        path: "/trial",
        element: <StartTrialPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);
