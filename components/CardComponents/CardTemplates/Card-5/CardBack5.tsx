import Image from "next/image";

function CardBack5() {
  const logos = {
    linkedin: "/assets/logo/black_logos/linkedin_black.svg",
    twitter: "/assets/logo/black_logos/twitter_black.svg",
    personal: "/assets/logo/black_logos/personal_black.svg",
    qr: "/assets/logo/black_logos/qr_black.svg",
  };

  const design = {
    logo: "hover:scale-[102%] active:scale-95 transition-transform duration-300 ease-in-out cursor-pointer",
    text1: "text-xs font-semibold text-[#0331AB]/90 font-['Inter']",
    text2: "text-xs font-medium text-[#0331AB]/80 font-['Inter']",
  };

  return (
    <div className="h-[300px] w-[500px] p-5 bg-[#F9F9F9] flex justify-between items-center gap-5 rounded-sm shadow-md overflow-hidden">
      <div className="h-full flex flex-col justify-end items-start gap-3">
        <div className="flex flex-col justify-start items-start">
          <p className={design.text1}>CollabX User</p>
          <p className={design.text2}>ML Engineer</p>
        </div>
        <div className="flex flex-col justify-start items-start">
          <p className={design.text2}>+91 xxxxxxxxx</p>
          <p className={design.text2}>youremail@gmail.com</p>
        </div>
      </div>
      <div className="h-full flex flex-col justify-end items-end gap-2">
        <div className="hover:shadow-md">
          <Image
            className={design.logo}
            src={logos.linkedin}
            height={40}
            width={40}
            alt="LinkedIn"
          />
        </div>
        <div className="hover:shadow-md">
          <Image
            className={design.logo}
            src={logos.twitter}
            height={40}
            width={40}
            alt="Twitter"
          />
        </div>
        <div className="hover:shadow-md">
          <Image
            className={design.logo}
            src={logos.personal}
            height={40}
            width={40}
            alt="Personal"
          />
        </div>
        <div className="hover:shadow-md">
          <Image
            className={design.logo}
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

export default CardBack5;
