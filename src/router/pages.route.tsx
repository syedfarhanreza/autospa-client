import Booking from "@/pages/Booking/Booking";
import Home from "@/pages/Home/Home";
import ServiceDetail from "@/pages/ServiceDetail/ServiceDetail";
import Services from "@/pages/Services/Services";
import Testimonials from "@/pages/testimonials/Testimonials";
import UserProtectedRoutes from "@/ProtectRoutes/UserProtectRoute";

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

  {
    index: true,
    path: "testimonials",
    element: <Testimonials />,
  },
  {
    index: true,
    path: "service/:id",
    element: <ServiceDetail />,
  },
  {
    index: true,
    path: "proceed-booking",
    element: (
      <UserProtectedRoutes>
        <Booking />
      </UserProtectedRoutes>
    ),
  },
];
