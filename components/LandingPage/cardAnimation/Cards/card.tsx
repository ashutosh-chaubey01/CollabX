import Image from "next/image";
import React from "react";

interface CardProps {
  heading: string;
  subHeading: string;
}

function Card({ heading, subHeading }: CardProps) {
  const variants = {
    textStyle:
      "textStyle text-[#303030] text-xl font-bold text-center uppercase tracking-wide mb-3",
    textBox: "h-fit py-1 overflow-hidden mb-3",
    miniText:
      "miniText text-[#2E2E2E]/60 font-semibold text-base tracking-wide text-center px-2",
  };
  return (
    <>
      <div className="p-2 rounded-3xl shadow-md h-[300px] w-[300px] bg-white/90 flex flex-col justify-center items-center gap-3 hover:shadow-xl hover:scale-[102%] transition-all duration-300 ease-in-out cursor-pointer ">
        <Image
          src="/assets/images/infinity.png"
          width={100}
          height={100}
          alt=""
          className="mb-3"
        />
        <h1 className={variants.textStyle}>{heading}</h1>
        <p className={variants.miniText}>{subHeading}</p>
      </div>
    </>
  );
}

export default Card;
