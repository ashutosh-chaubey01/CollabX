interface cardProp {
  word: string;
  bgColor: string;
  textColor: string;
  fontSize?: string;
}

function CardFront2({ word, bgColor, textColor, fontSize }: cardProp) {
  return (
    <div
      style={{
        backgroundColor: bgColor,
        borderColor: `${bgColor}30`,
      }}
      className="h-[300px] w-[500px] border-2 flex flex-col justify-end items-center rounded-sm shadow-md overflow-hidden">
      <div className="w-full flex justify-center items-center">
        <p
          style={{
            fontSize: fontSize ?? undefined,
            overflowWrap: "break-word",
            wordBreak: "break-word",
            whiteSpace: "normal",
          }}
          className="font-['Inter'] font-extrabold text-black/80 leading-none">
          {word.charAt(0)}
        </p>
        <p
          style={{
            color: textColor,
            fontSize: fontSize ?? undefined,
            overflowWrap: "break-word",
            wordBreak: "break-word",
            whiteSpace: "normal",
          }}
          className="font-['Inter'] font-extrabold stroke-inherit leading-none">
          <span className="">{word.substring(1, word.length)}</span>
        </p>
      </div>
    </div>
  );
}

export default CardFront2;
