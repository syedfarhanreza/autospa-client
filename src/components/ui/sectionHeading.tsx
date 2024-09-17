import React from "react";

interface IProps {
  slogan: string;
  heading: string;
  description: string;
}

const SectionHeading: React.FC<IProps> = ({ slogan, heading, description }) => {
  return (
    <div className="w-full flex-col gap-[4px] center">
      <h4 className="text-center font-[700] uppercase hero_title text-primaryMat tracking-[7px]">
        {slogan}
      </h4>
      <h2 className="text-[40px] md:text-[55px] text-center text-[#f3f3f3] font-[500] hero_title capitalize">
        {heading}
      </h2>
      <p className="text-[#ececec] text-center text-[15px]">{description}</p>
    </div>
  );
};

export default SectionHeading;
