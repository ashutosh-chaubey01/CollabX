interface cardProp {
  word: string;
  bgColor: string;
  textColor: string;
  fontSize?: string;
}

function CardFront5({ word, bgColor, textColor, fontSize }: cardProp) {
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="h-[300px] w-[500px] p-5 flex justify-center items-center rounded-sm shadow-md overflow-hidden">
      <p
        style={{
          color: textColor,
          fontSize: fontSize ?? undefined,
          overflowWrap: "break-word",
          wordBreak: "break-word",
          whiteSpace: "normal",
        }}
        className="text-2xl font-regular opacity-90 font-['Inter'] tracking-[0.5rem] uppercase">
        {word}
      </p>
    </div>
  );
}

export default CardFront5;
