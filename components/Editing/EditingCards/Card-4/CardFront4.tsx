interface cardProp {
  word: string;
  bgColor: string;
  textColor: string;
  fontSize?: string;
}

function CardFront4({ word, bgColor, textColor, fontSize }: cardProp) {
  const design = {
    stroke: `card font-bold font-['Inter'] text-7xl uppercase opacity-50`,
    main: "font-bold font-['Inter'] text-7xl opacity-90 uppercase",
  };

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="h-[300px] w-[500px] px-5 gap-5 flex justify-center items-center rounded-sm shadow-md overflow-hidden">
      <div className="w-fit flex flex-col justify-center items-center gap-[2px]">
        <p
          style={{
            color: textColor,
            fontSize: fontSize ?? undefined,
            overflowWrap: "break-word",
            wordBreak: "break-word",
            whiteSpace: "normal",
          }}
          className={design.stroke}>
          {word}
        </p>
        <p
          style={{
            color: textColor,
            fontSize: fontSize ?? undefined,
            overflowWrap: "break-word",
            wordBreak: "break-word",
            whiteSpace: "normal",
          }}
          className={design.stroke}>
          {word}
        </p>
        <p
          style={{
            color: textColor,
            fontSize: fontSize ?? undefined,
            overflowWrap: "break-word",
            wordBreak: "break-word",
            whiteSpace: "normal",
          }}
          className={design.main}>
          {word}
        </p>
        <p
          style={{
            color: textColor,
            fontSize: fontSize ?? undefined,
            overflowWrap: "break-word",
            wordBreak: "break-word",
            whiteSpace: "normal",
          }}
          className={design.stroke}>
          {word}
        </p>
        <p
          style={{
            color: textColor,
            fontSize: fontSize ?? undefined,
            overflowWrap: "break-word",
            wordBreak: "break-word",
            whiteSpace: "normal",
          }}
          className={design.stroke}>
          {word}
        </p>
      </div>
    </div>
  );
}

export default CardFront4;
