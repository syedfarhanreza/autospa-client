import Footer from "@/pages/shared/Footer";
import Navbar from "@/pages/shared/Navbar";
import { Outlet } from "react-router-dom";
import UserDashboardSidebar from "../dashboard/UserDashboardSidebar";

const UserDashboardLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full min-h-screen flex items-start justify-center layout_container py-[50px] bg-black">
        <div className="min-h-[400px] text-white overflow-auto flex flex-col md:flex-row items-start justify-start gap-[20px] md:p-[25px] rounded-[10px] shadow-md w-full bg-gray-950">
          <UserDashboardSidebar />
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboardLayout;
