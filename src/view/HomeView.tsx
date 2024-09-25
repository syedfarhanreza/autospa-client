import FeaturedServices from "@/components/home/FeaturedServices";
import HeroSection from "@/components/home/HeroSection";
import InfoSection from "@/components/home/InfoSection";
import Reviews from "@/components/home/Reviews";
import WhyChooseUs from "@/components/home/WhyChooseUs";

const HomeView = () => {
  return (
    <>
      <HeroSection />
      <InfoSection />
      <FeaturedServices />
      <WhyChooseUs />
      <Reviews />
    </>
  );
};

export default HomeView;
