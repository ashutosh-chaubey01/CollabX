import Image from "next/image";

function Card5() {
  return (
    <div className="h-[300px] w-[500px] shadow-lg bg-white rounded-sm flex justify-center items-center">
      <Image src="/assets/images/cp1.png" alt="" width={500} height={300} />
    </div>
  );
}

export default Card5;
