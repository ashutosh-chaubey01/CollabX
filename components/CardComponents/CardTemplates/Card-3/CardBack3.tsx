import Image from "next/image";

function CardBack3() {
  const logos = {
    linkedin: "/assets/logo/black_logos/linkedin_black.svg",
    twitter: "/assets/logo/black_logos/twitter_black.svg",
    personal: "/assets/logo/black_logos/personal_black.svg",
    qr: "/assets/logo/black_logos/qr_black.svg",
  };

  return (
    <div className="h-[300px] w-[500px] p-4 bg-white/90 flex flex-col justify-between items-start rounded-sm shadow-md overflow-hidden">
      <div className="w-full flex justify-between items-center">
        <p className="uppercase text-xl font-semibold font-['Inter']">
          CollabX User
        </p>
        <Image
          src="/assets/icons/logo.svg"
          width={50}
          height={50}
          alt="verified"
        />
      </div>
      <div className="w-full flex flex-col justify-center items-start gap-5">
        <div className="w-full flex flex-col justify-start items-start">
          <p className="text-xs font-medium text-black/80">A CollabX User</p>
          <p className="text-xs font-medium text-black/80">
            can show their creativity
          </p>
        </div>
        <div className="w-full flex flex-col justify-start items-start gap-1">
          <p className="text-xs font-medium text-black/80">@CollabXuser</p>
          <div className="flex justify-start items-center gap-2">
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
      </div>
    </div>
  );
}

export default CardBack3;
