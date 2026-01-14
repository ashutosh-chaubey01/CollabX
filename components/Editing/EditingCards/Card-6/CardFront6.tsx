import React from "react";
import "./demo.css";

interface cardProp {
  word: string;
  bgColor: string;
  textColor: string;
  fontSize?: string;
}

function CardFront6({ word, bgColor, textColor, fontSize }: cardProp) {
  return (
    <div
      id="card"
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
        className="text-5xl font-medium">
        {word}
      </p>
    </div>
  );
}

export default CardFront6;
