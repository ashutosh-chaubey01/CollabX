import Image from "next/image";

function CardBack4() {
  const logos = {
    linkedin: "/assets/logo/black_logos/linkedin_black.svg",
    twitter: "/assets/logo/black_logos/twitter_black.svg",
    personal: "/assets/logo/black_logos/personal_black.svg",
    qr: "/assets/logo/black_logos/qr_black.svg",
  };

  const design = {
    text: "font-medium font-['Inter'] text-[#243F36]/80 text-xs",
  };

  return (
    <div className="h-[300px] w-[500px] p-5 bg-[#C1C0BA] flex justify-center items-center gap-5 rounded-sm shadow-md overflow-hidden">
      <div className="w-full h-full flex justify-center items-center py-1 gap-4">
        <div className="grid grid-cols-2 grid-rows-2 gap-2 place-self-center">
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
        <div className="w-[2px] h-1/3 bg-[#243F36]/60"></div>
        <div className="flex flex-col justify-normal items-start">
          <p style={{ paddingBottom: "8px" }} className={design.text}>
            +91 xxxxxxxxx
          </p>
          <p className={design.text}>CollabX User</p>
          <p className={design.text}>youremail@mail.com</p>
          <p className={design.text}>www.yourwebsite.com</p>
        </div>
      </div>
    </div>
  );
}

export default CardBack4;
