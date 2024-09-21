import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IUserBooking, TBookingCountDown } from "@/types/booking";
import { getTimeRemaining } from "@/utils/getRemainingSlots";
import { format } from "date-fns";
import { ClockIcon } from "lucide-react";
import { useEffect, useState } from "react";
const UserBookingCard = ({ data }: { data: IUserBooking }) => {
  const [countdown, setCountdown] = useState<TBookingCountDown | null>(null);

  useEffect(() => {
    const slotEndTime = new Date(`${data.slot.date}T${data.slot.endTime}`);
    const updateCountdown = () => {
      setCountdown(getTimeRemaining(slotEndTime));
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [data]);
  return (
    <Card>
      <CardContent className="flex flex-col gap-4 p-5">
        <h3 className="text-lg break-words font-[700]">
          {data?.service?.name}
        </h3>

        <div className="text-sm text-muted-foreground flex-col flex gap-[5px]">
          <p>
            Date:{" "}
            {format(new Date(data?.slot?.date || "11-11-2020"), "MMM dd yyyy")}
          </p>
          <p>Time:{data.slot?.startTime}</p>
          <div className="flex items-center gap-2 text-muted-foreground shrink-0">
            <ClockIcon className="w-4 h-4" />
            <span>
              {countdown?.days || 0}d {countdown?.hours || 0}h{" "}
              {countdown?.minutes || 0}m {countdown?.seconds || 0}s
            </span>
          </div>
          <Badge
            className={`w-fit`}
            variant={data?.status === "cancel" ? "destructive" : "secondary"}
          >
            {data?.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserBookingCard;
