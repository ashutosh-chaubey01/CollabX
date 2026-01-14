"use client";
import React, { useState, useEffect } from "react";
import colorsData from "./colors.json";

interface PallateProps {
  onColorClick: (color: string) => void;
}

function Pallate({ onColorClick }: PallateProps) {
  interface Color {
    key: string;
    color: string;
  }

  const [colors, setColors] = useState<Color[]>([]);

  useEffect(() => {
    setColors(
      colorsData.map((color: { key: number; color: string }) => ({
        ...color,
        key: color.key.toString(),
      }))
    );
  }, []);

  return (
    <div
      className="w-full flex items-center bg-white/80 gap-4 px-12 py-4 rounded-b-md border-black/30 border-2 overflow-x-scroll whitespace-nowrap"
      style={{
        scrollbarWidth: "thin",
        scrollBehavior: "smooth",
        scrollbarColor: "#1a1a1a",
        scrollPadding: "0.5rem",
      }}>
      {colors.map((colorObj) => (
        <div
          key={colorObj.key}
          className="h-20 w-24 flex-shrink-0 rounded-md border-white/50 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200 ease-out"
          style={{ backgroundColor: colorObj.color }}
          onClick={() => onColorClick(colorObj.color)} // Call onColorClick with the selected color
        ></div>
      ))}
    </div>
  );
}

export default Pallate;
