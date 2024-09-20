import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../ui/ThemeProvider";
import Sidebar from "../dashboard/Sidebar";
const DashboardLayout = () => {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="w-full h-screen flex items-start justify-start pb-[30px]">
        <Sidebar />
        <div className="w-full h-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
};
export default DashboardLayout;
