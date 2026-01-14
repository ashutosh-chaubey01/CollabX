import Image from "next/image";

function CardBack2() {
  const logos = {
    linkedin: "/assets/logo/black_logos/linkedin_black.svg",
    twitter: "/assets/logo/black_logos/twitter_black.svg",
    personal: "/assets/logo/black_logos/personal_black.svg",
    qr: "/assets/logo/black_logos/qr_black.svg",
  };

  return (
    <div className="h-[300px] w-[500px] border-2 border-black/30 p-5 bg-white flex flex-col justify-between items-center rounded-sm shadow-md">
      <div className="w-full flex justify-between items-start">
        <div className="flex flex-col items-start justify-center">
          <p className="text-base font-semibold font-['Poppins']">
            CollabX User
          </p>
          <p className="text-sm font-medium text-black/80 font-['Poppins']">
            CollabXuser@gmail.com
          </p>
        </div>
        <p className="text-base font-semibold font-['Poppins']">
          Developer/Designer
        </p>
      </div>

      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col justify-center items-start gap-[2px] text-center">
          <p className="text-xs font-medium text-black/80 font-['Poppins']">
            Hi There! I am a CollabX Card
          </p>
          <p className="text-xs font-medium text-black/80 font-['Poppins']">
            You can customize me!
          </p>
          <p className="text-xs font-medium text-black/80 font-['Poppins']">
            Let your creativity go wild
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
    </div>
  );
}

export default CardBack2;
