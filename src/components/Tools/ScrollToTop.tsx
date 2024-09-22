import { useEffect, useState } from "react";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { animateScroll } from "react-scroll";
const ScrollToTop = () => {
  const [shouldShake, setShouldShake] = useState(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setShouldShake(true);

      setTimeout(() => {
        setShouldShake(false);
      }, 1000);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);
  const options = {
    duration: 600,
    smooth: true,
  };
  return (
    <button
      className={`w-12 h-12 bg-primaryMat text-black flex justify-center items-center rounded-full text-2xl cursor-pointer ${
        shouldShake ? "scrollToTop shake" : "scrollToTop"
      }`}
      onClick={() => animateScroll.scrollToTop(options)}
    >
      <FaRegArrowAltCircleUp />
    </button>
  );
};

export default ScrollToTop;
