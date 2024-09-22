"use client";
import { cn } from "@/lib/utils";
import { logout } from "@/redux/features/auth/auth.slice";
import { adminLinks } from "@/types/navlinks";
import Cookies from "js-cookie";
import { ChevronLeft } from "lucide-react";
import { SetStateAction, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { DashboardNav } from "./DashboardNav";
import { useAppDispatch } from "@/redux/hook";

type SidebarProps = {
  className?: string;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
};

export default function Sidebar({
  className,
  isOpen,
  setIsOpen,
}: SidebarProps) {
  const dispatch = useAppDispatch();

  // outside click hide the drawer
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // event target
      const target = event.target as HTMLElement;
      // screen width
      const screen = window.screen.width;

      // ---**** return if the screen width is larger
      if (screen > 1024) {
        return;
      }

      // return if the user click on the sidebar or the navbar
      if (target.closest(".sidebar") || target.closest(".menuBTn")) {
        return;
      }

      setIsOpen(false);
    };

    // hide sidebar on clicking outside
    if (isOpen) {
      document.body.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, setIsOpen]);

  const toggleStyle = {
    left: isOpen ? "277px" : "10px",
    rotate: isOpen ? "0deg" : "180deg",
  };

  const handleLogout = () => {
    Cookies.remove("refreshToken");
    dispatch(logout());
  };
  const handleCloseBar = () => {
    const width = window.screen.width;

    width > 767 ? "" : setIsOpen(false);
  };
  return (
    <aside
      style={{
        transition: "0.3s",
        width: `${isOpen ? "287px" : "0px"}`,
        display: "flex",
      }}
      className={cn(
        `md:relative fixed top-0 left-0  h-screen border-r bg-card transition-[width] duration-500 md:block
        w-72 shrink-0 overflow-hidden z-[9999] sidebar flex flex-col gap-[20px] justify-between pb-[20px]`,
        className
      )}
    >
      <div className="w-full">
        <div className="hidden p-5 pt-10 lg:block">
          <Link to={"/"}>
            <h3 className="font-[600] text-[20px]">AutoSpa</h3>
          </Link>
        </div>

        <ChevronLeft
          className={cn(
            "fixed z-20 top-[40%] cursor-pointer rounded-full border bg-background text-3xl text-foreground md:flex hidden"
          )}
          style={{
            transition: "0.3s",
            ...toggleStyle,
          }}
          onClick={() => setIsOpen(!isOpen)}
        />

        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="mt-3 space-y-1" onClick={handleCloseBar}>
              <DashboardNav items={adminLinks} />
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={handleLogout}
        className="w-[90%] mx-auto"
        variant={"destructive"}
      >
        Logout
      </Button>
    </aside>
  );
}
