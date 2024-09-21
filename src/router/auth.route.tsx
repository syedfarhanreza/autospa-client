import Login from "@/pages/login/Login";
import Register from "@/pages/register/Register";
export const authRoutes = [
  {
    index: true,
    path: "login",
    element: <Login />,
  },
  {
    index: true,
    path: "register",
    element: <Register />,
  },
];
