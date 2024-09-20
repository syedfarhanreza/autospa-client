"use client";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { DashboardNav } from "./DashboardNav";

type SidebarProps = {
  className?: string;
};
export default function Sidebar({ className }: SidebarProps) {
  const handleToggle = () => {};
  return (
    <aside
      className={cn(
        `relative  h-screen flex-none border-r bg-card transition-[width] duration-500 md:block
        w-72 shrink-0`,
        className
      )}
    >
      <div className="hidden p-5 pt-10 lg:block">
        <Link to={"/"}>
          <h3 className="font-[600] text-[20px]">AutoSpa</h3>
        </Link>
      </div>
      <ChevronLeft
        className={cn(
          "absolute -right-3 top-10 z-50  cursor-pointer rounded-full border bg-background text-3xl text-foreground"
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={adminLinks} />
          </div>
        </div>
      </div>
    </aside>
  );
}
