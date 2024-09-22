import Footer from "@/pages/shared/Footer";
import Navbar from "@/pages/shared/Navbar";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Comparison from "../Tools/Comparison";
import ScrollToTop from "../Tools/ScrollToTop";

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
      <div className="fixed bottom-[20px] right-[20px] center gap-[20px]">
        <Comparison />
        <ScrollToTop />
      </div>
    </>
  );
};
export default MainLayout;
