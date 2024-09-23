import DashboardHeader from "@/pages/shared/DashboardHeader";
import React, { SetStateAction, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../dashboard/Sidebar";
export interface ISideBarState {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}
const AdminDashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-black w-full h-screen flex items-start justify-start pb-[30px]">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="w-full h-full flex-col flex">
        <DashboardHeader isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="h-full overflow-auto smoothBar">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
