import MainLayout from "@/components/Layouts/MainLayouts";
import NotFound from "@/pages/shared/NotFound";
import { createBrowserRouter } from "react-router-dom";
import { pageRoutes } from "./pages.route";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [...pageRoutes],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
