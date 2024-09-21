import Booking from "@/pages/Booking/Booking";
import Home from "@/pages/Home/Home";
import Services from "@/pages/Services/Services";
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
    path: "proceed-booking",
    element: (
      <UserProtectedRoutes>
        <Booking />
      </UserProtectedRoutes>
    ),
  },
];
