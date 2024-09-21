import BookingManage from "@/pages/Admin/BookingManage";
import ManageUser from "@/pages/Admin/ManageUser";
import ServiceManage from "@/pages/Admin/ServiceManage";
import SlotManage from "@/pages/Admin/SlotManage";
export const adminRoutes = [
  {
    index: true,
    path: "",
    element: <ServiceManage />,
  },
  {
    index: true,
    path: "manage-user",
    element: <ManageUser />,
  },
  {
    index: true,
    path: "manage-slots",
    element: <SlotManage />,
  },
  {
    index: true,
    path: "manage-bookings",
    element: <BookingManage />,
  },
];
