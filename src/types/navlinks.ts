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
    title: "User",
  },
  {
    href: "/dashboard/admin/manage-slots",
    Icon: CiUser,
    title: "Employee",
  },
  {
    href: "/dashboard/admin",
    Icon: CiUser,
    title: "Profile",
  },
];
