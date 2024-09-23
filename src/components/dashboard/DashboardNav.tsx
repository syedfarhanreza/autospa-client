import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/navlinks";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface DashboardNavProps {
  items: NavItem[];
}

export function DashboardNav({ items }: DashboardNavProps) {
  const location = useLocation();
  const path = location.pathname;
  const isMobileNav = false;
  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        {items.map(({ Icon, href, title }, index) => {
          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Link
                  to={href}
                  className={cn(
                    "flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium text-white hover:bg-gray-800 hover:text-white",
                    path === href ? "bg-primaryMat text-black" : "bg-gray-950"
                  )}
                >
                  <Icon className={`ml-3 size-5 flex-none`} />

                  {!isMobileNav ? (
                    <span className="mr-2 truncate">{title}</span>
                  ) : (
                    ""
                  )}
                </Link>
              </TooltipTrigger>
              <TooltipContent
                align="center"
                side="right"
                sideOffset={8}
                // className={!isMinimized ? "hidden" : "inline-block"}
              >
                {title}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </nav>
  );
}
