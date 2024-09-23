import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { MdArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";
export const RenderNewLine = ({ text }: { text: string }) => {
  return text.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
};
const HeroSection = () => {
  const sliderData = [
    {
      id: 1,
      image: "/images/banner1.jpg",
      heading: "Premium Car Care",
      desc: "Experience top-tier car wash services that make your vehicle shine like new.",
    },
    {
      id: 2,
      image: "/images/banner2.jpg",
      heading: "Interior & Exterior Detailing",
      desc: "Get a thorough cleaning, inside and out, with our comprehensive car detailing packages.",
    },
    {
      id: 3,
      image: "/images/banner3.jpg",
      heading: "Advanced Automatic Wash",
      desc: "Enjoy a fast and efficient wash with our cutting-edge, fully automatic machines.",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <Carousel
        className="overflow-hidden lg:h-screen h-[400px]"
        plugins={[
          Autoplay({
            delay: 6000,
          }),
        ]}
      >
        <CarouselContent className="flex">
          {sliderData.map((slider) => (
            <CarouselItem key={slider.id} className="min-w-full">
              <Card className="bg-transparent bg-blend-overlay rounded-none border-none shadow-none">
                <CardContent className="flex items-center justify-center h-full p-0 w-full">
                  <div
                    className="relative w-full lg:h-screen h-[400px] overflow-hidden"
                    style={{ transition: "0.3s" }}
                  >
                    <div className="overlay" />
                    <img
                      src={slider.image}
                      className="absolute z-[1]  top-0 left-0 h-full w-full object-cover ani_image"
                      alt=""
                    />

                    <div className="relative z-[21] w-full h-full  flex-col center pl-[50px] bg-[#00000011] gap-[5px]">
                      <h4 className="text-center font-[700] uppercase hero_title text-primaryMat tracking-[7px]">
                        top class cleaning
                      </h4>
                      <h1 className="text-[20px] sm:text-[30px] hero_title lg:text-[90px] font-[700] text-white capitalize">
                        <RenderNewLine text={slider.heading} />
                      </h1>
                      <p className="max-w-[550px] text-white text-center  text-[12px] sm:text-[14px] lg:text-[16px]">
                        {slider.desc}
                      </p>
                      <div className="center gap-[10px]">
                        <Link
                          to={"/services"}
                          className="center gap-[5px] px-[20px] py-[8px] md:px-[40px] md:py-[12px] rounded-full bg-primaryMat text-black mt-[20px] text-[15px] md:text-[25px]"
                        >
                          Book a Slot <MdArrowForwardIos />
                        </Link>
                        <Link
                          to={"/"}
                          className="center gap-[5px] px-[20px] py-[8px] md:px-[40px] md:py-[12px] rounded-full bg-white text-yellow-500 mt-[20px] text-[15px] md:text-[25px]"
                        >
                          Explore <MdArrowForwardIos />
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300">
          &#9664;
        </CarouselPrevious>
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300">
          &#9654;
        </CarouselNext>
      </Carousel>
    </div>
  );
};
export default HeroSection;
