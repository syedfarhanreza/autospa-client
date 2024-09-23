import { IconType } from "react-icons";
import { CiUser } from "react-icons/ci";
export interface NavItem {
  href: string;
  title: string;
  Icon: IconType;
}
export const adminLinks: NavItem[] = [
  {
    href: "/dashboard/admin",
    Icon: CiUser,
    title: "Dashboard",
  },
  {
    href: "/dashboard/admin/manage-user",
    Icon: CiUser,
    title: "user",
  },
  {
    href: "/dashboard/admin/manage-slots",
    Icon: CiUser,
    title: "employee",
  },
  {
    href: "/dashboard/admin",
    Icon: CiUser,
    title: "profile",
  },
  {
    href: "/dashboard/ban",
    Icon: CiUser,
    title: "ban",
  },
  {
    href: "/",
    Icon: CiUser,
    title: "login",
  },
];
