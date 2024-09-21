import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetServiceNamesQuery } from "@/redux/features/service/service.api";
import { useCreateSlotMutation } from "@/redux/features/slots/slots.api";
import { formateDateString } from "@/utils/dateFormat";
import { format } from "date-fns";
import { CalendarDaysIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
const times = [
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

const AddSlot = () => {
  const [createSlot] = useCreateSlotMutation(undefined);

  const [time, setTime] = useState({ startTime: "", endTime: "" });
  const [service, setService] = useState("");
  const [date, setDate] = useState<Date>();
  const { data } = useGetServiceNamesQuery(undefined);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const btn = document.getElementById("close_service") as HTMLButtonElement;

    const { endTime, startTime } = time;
    if (!service) {
      return toast.error("Please select a service for slot");
    }
    if (!date) {
      return toast.error("Please select a date");
    }
    if (!startTime) {
      return toast.error("Please select End time for slot");
    }
    if (!endTime) {
      return toast.error("Please select End time for slot");
    }

    if (startTime > endTime) {
      return toast.error("Start time can't be after the end time");
    }

    const toastId = toast.loading("Please wait..");
    try {
      const payload = {
        startTime,
        endTime,
        service,
        date: formateDateString(date.toString()),
      };
      const res = await createSlot(payload as any);

      toast.dismiss(toastId);
      if (!res.data?.success) {
        return toast.error("something went wrong while making this request", {
          description: "Please try again",
        });
      }
      btn.click();
      toast.success("Successfully created service");
    } catch (error) {
      console.log(error);

      toast.dismiss(toastId);
      return toast.error("something went wrong while making this request", {
        description: "Please try agin",
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Create New Slot</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Slot</DialogTitle>
          <DialogDescription>
            Fill out the details to create a new slot.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="service">Service</Label>
            <Select onValueChange={setService}>
              <SelectTrigger>
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                {data?.data.map(({ _id, name }) => (
                  <SelectItem key={_id} value={_id}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
                  {date ? format(date, "MMM dd yyyy") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  selected={date}
                  onSelect={(date) => {
                    setDate(date || new Date());
                  }}
                  mode="single"
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="start-time">Start Time</Label>
              <Select
                onValueChange={(e) => {
                  setTime((load) => ({ ...load, startTime: e }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select start time" />
                </SelectTrigger>
                <SelectContent>
                  {times.map((time) => (
                    <SelectItem value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="start-time">End Time</Label>
              <Select
                onValueChange={(e) => {
                  setTime((load) => ({ ...load, endTime: e }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select start time" />
                </SelectTrigger>
                <SelectContent>
                  {times.map((time) => (
                    <SelectItem value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" type="button" id="close_service">
                Cancel
              </Button>
            </DialogClose>
            <Button>Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSlot;
