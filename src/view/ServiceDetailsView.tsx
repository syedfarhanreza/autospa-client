import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import SectionHeading from "@/components/ui/sectionHeading";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { setBookingInfo } from "@/redux/features/booking/booking.slice";
import { useGetServiceByIdQuery } from "@/redux/features/service/service.api";
import { useGetSlotsQuery } from "@/redux/features/slots/slots.api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { formateDateString } from "@/utils/dataFormat";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ServiceDetailsView = () => {
  const { id } = useParams();
  const [date, setDate] = useState(new Date());

  const dispatch = useAppDispatch();
  const { slot: selectedSlot } = useAppSelector((state) => state.booking);
  const { user } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const { data: service } = useGetServiceByIdQuery(id as string);
  const { data = { data: [] }, isFetching } = useGetSlotsQuery({
    date: formateDateString(date.toString()),
    serviceId: id,
  });

  const handleProceed = () => {
    const bookingPage = "/proceed-booking";

    if (!selectedSlot) return;
    dispatch(setBookingInfo({ service: id }));
    if (!user) {
      Cookies.set("redirect", bookingPage);
      navigate("/login");
      return;
    }
    navigate(bookingPage);
  };

  console.log(selectedSlot);

  return (
    <div className="py-8 md:py-12 lg:py-16 bg-black w-full">
      <SectionHeading
        slogan="book plan"
        description=""
        heading="Explore more about this service"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 layout_container">
        <div
          className="shadow-md p-[20px] rounded-[15px] text-white bg-gray-950 col-span-2
        "
        >
          <h1 className="text-2xl  font-bold mb-4 md:text-3xl text-primaryMat">
            {service?.data.name}
          </h1>
          <p className="text-slate-300 mb-6">{service?.data.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">Duration</h3>

              <p> {service?.data.duration} minutes</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Price</h3>
              <p>$ {service?.data.price}</p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="bg-gray-950 rounded-lg p-6 text-white">
            <h2 className="text-xl font-bold mb-4">Select a Date</h2>
            <Calendar
              selected={date}
              onSelect={(date) => {
                setDate(date || new Date());
                dispatch(setBookingInfo({ slot: "" }));
              }}
              mode="single"
              className="mx-auto w-fit p-0 [&_td]:w-10 [&_td]:h-10 [&_th]:w-10 [&_[name=day]]:w-10 focus:[&_[name=day]]:bg-primaryMat [&_[name=day]]:h-10 [&>div]:space-x-0 [&>div]:gap-6"
            />
          </div>
          <div className="bg-gray-950 text-white rounded-lg p-6 mt-6">
            <h2 className="text-xl font-bold mb-4">Available Time Slots</h2>
            <div className="grid text-black grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isFetching ? (
                <>
                  <button className="w-full skeleton h-[30px] rounded-[5px]" />
                  <button className="w-full skeleton h-[30px] rounded-[5px]" />
                  <button className="w-full skeleton h-[30px] rounded-[5px]" />
                  <button className="w-full skeleton h-[30px] rounded-[5px]" />
                </>
              ) : (
                <>
                  {data?.data.length ? (
                    <>
                      {data.data.map((slot) => {
                        const isDisable =
                          slot.isBooked == "booked" ||
                          slot.isBooked == "cancel";

                        return (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  key={slot._id}
                                  variant="outline"
                                  onClick={() => {
                                    if (isDisable) return;
                                    dispatch(
                                      setBookingInfo({ slot: slot._id })
                                    );
                                  }}
                                  className={`w-full ${
                                    selectedSlot == slot._id
                                      ? "bg-primaryMat text-black font-bold hover:bg-primaryMat"
                                      : ""
                                  } ${isDisable ? "opacity-[0.5]" : ""}`}
                                  style={
                                    isDisable ? { cursor: "not-allowed" } : {}
                                  }
                                >
                                  {slot.startTime}
                                </Button>
                              </TooltipTrigger>
                              {isDisable ? (
                                <TooltipContent>Not available</TooltipContent>
                              ) : (
                                ""
                              )}
                            </Tooltip>
                          </TooltipProvider>
                        );
                      })}
                    </>
                  ) : (
                    "No slot available"
                  )}
                </>
              )}
            </div>
            <div className="mt-6">
              <Button
                className="w-full text-black bg-primaryMat border-2 border-black hover:bg-black hover:border-2 hover:border-primaryMat hover:text-primaryMat"
                disabled={!selectedSlot}
                onClick={handleProceed}
              >
                Book This Service
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsView;
