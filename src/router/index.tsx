import MainLayout from "@/components/Layouts/MainLayouts";

import Home from "@/pages/Home/Home";
import NotFound from "@/pages/shared/NotFound";

import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
