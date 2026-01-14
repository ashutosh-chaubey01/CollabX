import "./card4.css";

function CardFront4() {
  const design = {
    stroke:
      "card font-bold font-['Inter'] text-7xl uppercase text-[#243F36] opacity-50",
    main: "font-bold font-['Inter'] text-7xl text-white/90 uppercase",
  };

  return (
    <div className="h-[300px] w-[500px] px-5 gap-5 bg-[#243F36] flex justify-center items-center rounded-sm shadow-md overflow-hidden">
      <div className="w-fit flex flex-col justify-center items-center gap-[2px]">
        <p className={design.stroke}>CollabX</p>
        <p className={design.stroke}>Collabx</p>
        <p className={design.main}>Collabx</p>
        <p className={design.stroke}>Collabx</p>
        <p className={design.stroke}>Collabx</p>
      </div>
    </div>
  );
}

export default CardFront4;
