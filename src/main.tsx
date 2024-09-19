import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import ProviderContainer from "./components/provider/ProviderContainer.tsx";
import "./index.css";
import router from "./router/index.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProviderContainer>
      <RouterProvider router={router} />
    </ProviderContainer>
  </React.StrictMode>
);
