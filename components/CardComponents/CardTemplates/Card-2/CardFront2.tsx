interface cardProp {
  word: string;
}

function CardFront2({ word }: cardProp) {
  return (
    <div className="h-[300px] w-[500px] border-2 border-black/30 bg-white flex flex-col justify-end items-center rounded-sm shadow-md">
      <div className="w-full flex justify-center items-center">
        <p className="font-['Inter'] text-[120px] font-extrabold text-black/80">
          {word.charAt(0)}
        </p>
        <p className="font-['Inter'] text-[120px] font-extrabold text-[#e5e2de] stroke-inherit">
          <span className="">{word.substring(1, word.length)}</span>
        </p>
      </div>
    </div>
  );
}

export default CardFront2;
