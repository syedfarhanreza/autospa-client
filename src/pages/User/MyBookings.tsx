import { useGetUserAllBookingsQuery } from "@/redux/features/booking/booking.api";
import UserBookingCard from "./UserBookingCard";
const MyBookings = () => {
  const { data } = useGetUserAllBookingsQuery({ filter: "" });

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.data?.map((data) => (
          <UserBookingCard data={data} key={data._id} />
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
