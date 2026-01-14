import Image from "next/image";

function CardBack1() {
  const design = {
    para: "font-['DM-Sans'] font-semibold text-sm tracking-wide uppercase text-black/80",
    para2:
      "font-['DM-Sans'] font-semibold text-[8px] tracking-wide uppercase text-black/80",
  };

  const logos = {
    linkedin: "/assets/logo/black_logos/linkedin_black.svg",
    twitter: "/assets/logo/black_logos/twitter_black.svg",
    personal: "/assets/logo/black_logos/personal_black.svg",
    qr: "/assets/logo/black_logos/qr_black.svg",
  };

  return (
    <div className="h-[300px] w-[500px] rounded-sm shadow-md p-8 bg-slate-200 flex justify-between">
      <div className="h-full flex flex-col justify-between items-start">
        <div className="flex flex-col items-start justify-start">
          <p className={design.para}>John Doe</p>
          <p className={design.para2}>CollabX User</p>
          <p className={design.para2}>Works at @CollabX.org</p>
          <p className={design.para2}>Says Hi!</p>
        </div>
        <p className="text-2xl font-bold text-gray-900 font-['Urbanist']">
          CollabX.
        </p>
      </div>

      <div className="grid grid-cols-2 grid-rows-2 gap-2 place-self-end">
        <div className="hover:shadow-md">
          <Image
            className="hover:scale-[102%] active:scale-95 transition-transform duration-300 ease-in-out cursor-pointer"
            src={logos.linkedin}
            height={40}
            width={40}
            alt="LinkedIn"
          />
        </div>
        <div className="hover:shadow-md">
          <Image
            className="hover:scale-[102%] active:scale-95 transition-transform duration-300 ease-in-out cursor-pointer"
            src={logos.twitter}
            height={40}
            width={40}
            alt="Twitter"
          />
        </div>
        <div className="hover:shadow-md">
          <Image
            className="hover:scale-[102%] active:scale-95 transition-transform duration-300 ease-in-out cursor-pointer"
            src={logos.personal}
            height={40}
            width={40}
            alt="Personal"
          />
        </div>
        <div className="hover:shadow-md">
          <Image
            className="hover:scale-[102%] active:scale-95 transition-transform duration-300 ease-in-out cursor-pointer"
            src={logos.qr}
            height={40}
            width={40}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default CardBack1;
