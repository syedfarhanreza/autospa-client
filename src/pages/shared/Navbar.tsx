import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { useAppSelector } from "@/redux/hooks";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { Link, NavLink } from "react-router-dom";
import UpcomingSlotCountdown from "./UpcomingSlotCountdown";

const navLinks = [
  {
    lebel: "Home",
    href: "/",
  },
  {
    lebel: "Services",
    href: "/services",
  },
  {
    lebel: "Testimonials",
    href: "/testimonials",
  },
];

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // event target
      const target = event.target as HTMLElement;
      // screent width
      const screen = window.screen.width;

      // ---**** return if the screen width is larger
      if (screen > 1024) {
        return;
      }

      // return if the user click on the drawer or the navbar
      if (target.closest(".myDrawer") || target.closest(".menuBTn")) {
        return;
      }

      setShowSidebar(false);
    };

    // hide sidebar on clicking outside
    if (showSidebar) {
      document.body.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showSidebar, setShowSidebar]);

  return (
    <header className=" bg-primaryMat/70 w-full">
      <div className="nav_shape sticky top-0 z-20 border-b-primaryMat border-b-[1px]">
        <div className="mx-auto layout_container">
          <div className="flex  items-center justify-between py-2">
            <Link to="/" className="flex items-center">
              <img src="/images/logo.png" className="w-[100px]" />
            </Link>
            <div className="center w-fit gap-[15px] pt-[0] pb-[10px]">
              <div className="hidden lg:flex">
                {navLinks.map(({ href, lebel }, i) => (
                  <Link
                    key={i}
                    to={href}
                    className={
                      navigationMenuTriggerStyle() +
                      " !bg-transparent !text-white font-[700] py-[0]"
                    }
                  >
                    {lebel}
                  </Link>
                ))}
              </div>

              {user ? (
                <Link
                  to={`/dashboard/${user.role == "admin" ? "admin" : "user"}`}
                  className="text-[15px] text-white bg-primaryMat px-[10px] py-[5px] center rounded-full gap-[3px]"
                >
                  <CiUser /> Dashboard
                </Link>
              ) : (
                <Link
                  to={"/login"}
                  className="px-[18px] py-[5px] bg-primaryMat text-white rounded-full center gap-[10px]"
                >
                  Login <CiUser />
                </Link>
              )}
              <UpcomingSlotCountdown />
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="md:hidden flex menuBTn"
              >
                {showSidebar ? <X /> : <Menu />}
              </button>
            </div>

            {/* sidebar */}
            <div
              className={`${
                showSidebar
                  ? "w-[300px] border-r-[1px] px-[20px] pt-[20px]"
                  : "w-[0px]"
              } bg-white left-0 top-0 fixed h-screen border-borderColor z-20 overflow-hidden myDrawer`}
              style={{ transition: "0.3s" }}
            >
              <Link to="/" className="flex items-center">
                <img src="/images/logo.png" className="w-[120px]" />
              </Link>
              <div className="w-full flex flex-col mt-[20px]">
                {navLinks.map(({ href, lebel }) => (
                  <NavLink
                    to={href}
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "bg-primaryMat text-white"
                          : "text-primaryTxt"
                      }  w-full px-[15px] py-[8px] rounded-[5px]`
                    }
                  >
                    {lebel}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
