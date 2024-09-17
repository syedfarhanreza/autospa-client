import { useGetUserAllBookingsQuery } from "@/redux/features/booking/booking.api";
import { TBookingCountDown } from "@/types/booking";
import { getTimeRemaining } from "@/utils/getRemainingSlots";
import { useEffect, useState } from "react";

const UpcomingSlotCountdown = () => {
  const [nextSlotCountdown, setNextSlotCountdown] =
    useState<TBookingCountDown | null>(null);

  const { data } = useGetUserAllBookingsQuery({
    filter: "payment=paid&status=confirm",
  });

  useEffect(() => {
    const now = new Date();

    const upcomingSlots = data?.data?.filter((booking) => {
      const slotStart = new Date(
        `${booking.slot.date}T${booking.slot.startTime}`
      );
      return slotStart > now;
    });

    const sortedSlots = upcomingSlots?.sort((a, b) => {
      const aStart = new Date(`${a.slot.date}T${a.slot.startTime}`);
      const bStart = new Date(`${b.slot.date}T${b.slot.startTime}`);
      return aStart.getTime() - bStart.getTime();
    });

    // console.log(sortedSlots);

    if (sortedSlots && sortedSlots.length > 0) {
      const nextSlotEndTime = new Date(
        `${sortedSlots[0].slot.date}T${sortedSlots[0].slot.endTime}`
      );

      const updateCountdown = () => {
        setNextSlotCountdown(getTimeRemaining(nextSlotEndTime));
      };

      updateCountdown();
      const intervalId = setInterval(updateCountdown, 1000);

      // Cleanup
      return () => clearInterval(intervalId);
    } else {
      setNextSlotCountdown(null);
    }
  }, [data?.data]);

  return (
    <>
      {nextSlotCountdown ? (
        <p className="text-white font-[600]">
          Next Slot: {nextSlotCountdown.days}d {nextSlotCountdown.hours}h{" "}
          {nextSlotCountdown.minutes}m {nextSlotCountdown.seconds}s
        </p>
      ) : (
        ""
      )}
    </>
  );
};
export default UpcomingSlotCountdown;
