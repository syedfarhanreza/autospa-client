import { useAppSelector } from "@/redux/hook";
import Cookies from "js-cookie";
import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const { user, isLoading, token } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || !token) {
    Cookies.set("redirect", location.pathname);
    navigate("/login");
    return <></>;
  }
  if (user.role !== "user") {
    navigate("/");
    return <></>;
  }

  return <>{children}</>;
};

export default UserProtectedRoutes;
