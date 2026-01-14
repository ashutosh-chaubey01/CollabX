import "./card.css";

interface cardProp {
  word: string;
  bgColor: string;
  textColor: string;
  fontSize?: string;
}

function CardFront3({ word, bgColor, textColor, fontSize }: cardProp) {
  return (
    <div
      id="pattern"
      style={{
        backgroundColor: bgColor,
        borderColor: `${bgColor}50`,
      }}
      className="h-[300px] w-[500px] border-2 p-2 flex justify-center items-center rounded-sm shadow-md overflow-hidden">
      <p
        style={{
          fontFamily: "var(--font-bumbbled)",
          color: textColor,
          fontSize: fontSize ?? undefined,
          overflowWrap: "break-word",
          wordBreak: "break-word",
          whiteSpace: "normal",
        }}
        className="text-6xl opacity-90">
        {word}
      </p>
    </div>
  );
}

export default CardFront3;
