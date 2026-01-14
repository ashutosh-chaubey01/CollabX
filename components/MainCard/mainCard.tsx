import ReactCardFlip from "react-card-flip";
import React from "react";
import CDemo_Back from "@/components/CardComponents/Card_Demo/CDemo_Back";
import CDemo_Front from "@/components/CardComponents/Card_Demo/CDemo_Front";

function MainCard({ isFlipped }: { isFlipped: boolean }) {
  const flipDirection = "vertical";

  return (
    <div className="h-full w-[500px] flex justify-center items-center">
      <ReactCardFlip isFlipped={isFlipped} flipDirection={flipDirection}>
        <div className="h-[300px] w-[500px] shadow-lg">
          <CDemo_Front />
        </div>
        <div className="h-[300px] w-[500px] shadow-lg">
          <CDemo_Back />
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default MainCard;
