import Footer from "@/pages/shared/Footer";
import Navbar from "@/pages/shared/Navbar";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  useEffect(() => {
    window.onbeforeunload = function () {
      return;
    };
  });
  return (
    <>
      <Navbar />
      <Outlet></Outlet>
      <Footer></Footer>
      <div className="fixed bottom-[20px] right-[20px] center gap-[20px]"></div>
    </>
  );
};
export default MainLayout;
