import Home from "@/pages/Home/Home";
import Services from "@/pages/Services/Services";

export const pageRoutes = [
  {
    index: true,
    element: <Home />,
  },

  {
    index: true,
    path: "services",
    element: <Services />,
  },
];
