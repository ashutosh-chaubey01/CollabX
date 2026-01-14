import React from "react";

interface cardProp {
  word: string;
  bgColor: string;
  textColor: string;
  fontSize?: string; // optional custom font size (e.g. '48px' or 'clamp(20px,4vw,56px)')
}

function CardFront1({ word, bgColor, textColor, fontSize }: cardProp) {
  return (
    <div
      style={{
        backgroundColor: bgColor,
        borderColor: `${bgColor}80`,
      }}
      className="h-[300px] w-[500px] border-2 p-2 flex justify-center items-center rounded-sm shadow-md overflow-hidden">
      <p
        style={{
          color: textColor,
          fontSize: fontSize ?? undefined,
          overflowWrap: "break-word",
          wordBreak: "break-word",
          whiteSpace: "normal",
        }}
        className="text-5xl font-bold font-['Urbanist']">
        {word}
      </p>
    </div>
  );
}

export default CardFront1;
