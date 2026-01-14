import "./card.css";

function CardFront3() {
  return (
    <div
      id="pattern"
      className="h-[300px] w-[500px] border-2 border-white/50 p-2 flex justify-center items-center rounded-sm shadow-md overflow-hidden">
      <p
        style={{ fontFamily: "var(--font-bumbbled)" }}
        className="text-6xl text-white/90">
        hello.
      </p>
    </div>
  );
}

export default CardFront3;
