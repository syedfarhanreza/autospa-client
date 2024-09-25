"use client";

import { logout } from "@/redux/features/auth/auth.slice";
import { useAppSelector } from "@/redux/hook";
import Cookies from "js-cookie";
import { CiLogout, CiUser } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { RiLockPasswordLine, RiUserSettingsLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export const userProfileLinks = [
  {
    href: "/dashboard/user",
    label: "Profile",
    Icon: CiUser,
  },
  {
    href: "/dashboard/user/update-info",
    label: "Account setting",
    Icon: RiUserSettingsLine,
  },
  {
    href: "/dashboard/user/my-bookings",
    label: "My Bookings",
    Icon: RiLockPasswordLine,
  },
];

const UserDashboardSidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout(undefined));
    Cookies.remove("refreshToken");
  };

  const handleGoBack = () => {};

  return (
    <div className="flex flex-col gap-[15px] w-full md:w-fit">
      <button
        className="flex items-center justify-start gap-[10px]"
        onClick={handleGoBack}
      >
        <FaArrowLeft /> Go Back
      </button>
      {user &&
        userProfileLinks.map(({ Icon, href, label }, i) => (
          <Link
            to={href}
            key={"profile" + i}
            className={`w-full md:w-[240px] border-[1px] border-borderColor py-[12px] rounded-[5px] flex items-center justify-start gap-[5px] font-[500] pl-[20px] ${
              path === href
                ? "bg-primary/90 text-white"
                : "bg-white text-primaryTxt"
            }`}
          >
            <Icon /> {label}
          </Link>
        ))}

      <button
        className="w-[240px] border-2 border-borderColor py-[12px] rounded-[5px] flex items-center justify-start gap-[5px] font-[500] pl-[20px] bg-red-600 hover:bg-red-400 text-white mt-[50px]"
        onClick={handleLogout}
      >
        <CiLogout /> Logout
      </button>
    </div>
  );
};

export default UserDashboardSidebar;
