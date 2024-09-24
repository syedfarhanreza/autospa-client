import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateBookingMutation } from "@/redux/features/booking/booking.api";
import { useGetSlotByIdQuery } from "@/redux/features/slots/slots.api";
import { useAppSelector } from "@/redux/hook";
import { IBooking } from "@/types/booking";
import { format } from "date-fns";
import { useFormik } from "formik";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";

const BookingView = () => {
  const { slot, service } = useAppSelector((state) => state.booking);
  const { user } = useAppSelector((state) => state.auth);
  const [createBooking] = useCreateBookingMutation();
  const navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState(0);
  const { data } = useGetSlotByIdQuery(slot);

  useEffect(() => {
    if (!user || !slot || !service) {
      return navigate("/");
    }
  }, [user, slot, service, navigate]);

  useEffect(() => {
    if (data && data.data && data.data.service && data.data.service.price) {
      setTotalPrice(data.data.service.price);
    }
  }, [data]);

  const handleSubmit = async () => {
    try {
      const payload: IBooking = {
        service,
        slot,
        customer: user?._id || "",
      };
      const { data } = await createBooking(payload);
      if (!data?.success) {
        return toast.error(
          "Something went wrong while accessing this resource"
        );
      }
      if (data && data.data?.payment_url) {
        window.location.href = data.data.payment_url;
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while accessing this resource");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: `${user?.firstName || ""} ${user?.lastName || ""}`,
      email: user?.email || "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <div className="w-full min-h-screen center bg-black md:py-0 py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 layout_container">
        <div className="bg-gray-950 text-white shadow-md rounded-xl p-6 md:p-8 flex flex-col gap-6">
          <div className="grid gap-2">
            <h2 className="text-2xl font-bold">Your Booking</h2>
            <p className="text-slate-300">
              Review your selected service and time.
            </p>
          </div>
          <Card>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="text-lg font-medium">
                    {data?.data?.service?.name}
                  </div>
                  <div className="text-sm text-slate-300">
                    {data?.data?.service?.duration} minutes
                  </div>
                </div>
                <div className="text-2xl font-bold text-primaryMat">
                  $ {data?.data?.service?.price}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <CalendarIcon className="w-6 h-6 text-slate-300" />
                <div>
                  <div className="text-lg font-medium">
                    {format(
                      new Date(data?.data.date || "11-11-2024"),
                      "MMM dd yyyy"
                    )}
                  </div>
                  <div className="text-sm text-slate-300">
                    {data?.data.startTime} to {data?.data.endTime}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center bg-muted text-primaryTxt px-[20px] py-[8px] rounded-[8px]">
            <p className="font-bold">Total</p>
            <p className="text-2xl font-bold">${totalPrice}</p>
          </div>
        </div>
        <div className="bg-gray-950 text-white rounded-xl p-6 md:p-8 flex flex-col gap-6 lg:col-span-2 shadow-md">
          <div className="grid gap-2">
            <h2 className="text-2xl font-bold">Personal Information</h2>
            <p className="text-slate-300">
              Enter your details to complete the booking.
            </p>
          </div>
          <form
            className="grid gap-4 text-black"
            onSubmit={formik.handleSubmit}
          >
            <div className="grid gap-2 ">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className={
                  formik.touched.name && formik.errors.name
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                readOnly
                value={formik.values.email}
                className={
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                name="time"
                value={
                  format(
                    new Date(data?.data?.date || "11-11-2024"),
                    "EEEE, MMMM d"
                  ) + ` at ${data?.data?.startTime || ""}`
                }
                readOnly
              />
            </div>
            <Button
              size="lg"
              className="w-full text-black font-bold bg-primaryMat border-2 border-black hover:bg-black hover:border-2 hover:border-primaryMat hover:text-primaryMat"
              type="submit"
            >
              Pay Now
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingView;
