import Image from "next/image";
import "./demo.css";

const logos = {
  linkedin: "/assets/logo/golden_logos/linkedin_golden.svg",
  twitter: "/assets/logo/golden_logos/twitter_golden.svg",
  personal: "/assets/logo/golden_logos/personal_golden.svg",
  qr: "/assets/logo/golden_logos/qr_golden.svg",
};

function CDemo_Back() {
  return (
    <div
      id="card-back"
      className="h-full w-full px-8 py-5  border-2 border-black/80 bg-[#131C2D] flex flex-col justify-center items-center">
      <div className="h-full w-full flex flex-col justify-center items-start gap-1">
        <p className="text-4xl font-medium italic text-[#AF9E77]">
          Shubh Mehrotra
        </p>
        <p className="font-normal text-sm opacity-70 italic">
          Welcome to CollabX
        </p>
      </div>
      <div className="w-full h-[200px] flex justify-center items-center">
        <div className="h-full w-1/2 border-[#AF9E77]/40 border-t-2 border-b-2 border-r-2 flex flex-col justify-center items-start">
          <p className="text-[16px] text-[#AF9E77]/70">FullStack Developer</p>
          <p className="text-[16px] text-[#AF9E77]/70">
            Freelance Web-Designer
          </p>
          <p className="text-[16px] text-[#AF9E77]/70">GDSC Tech Co-lead</p>
        </div>
        <div className="h-full w-1/2 border-[#AF9E77]/40 border-t-2 border-b-2 grid grid-cols-2 grid-rows-2 place-items-center">
          <div>
            <Image
              className="hover:scale-[102%] hover:shadow-md active:scale-95 transition-transform duration-300 ease-in-out cursor-pointer"
              src={logos.linkedin}
              height={40}
              width={40}
              alt=""
            />
          </div>
          <div>
            <Image
              className="hover:scale-[102%] hover:shadow-md active:scale-95 transition-transform duration-300 ease-in-out cursor-pointer"
              src={logos.twitter}
              height={40}
              width={40}
              alt=""
            />
          </div>
          <div>
            <Image
              className="hover:scale-[102%] hover:shadow-md active:scale-95 transition-transform duration-300 ease-in-out cursor-pointer"
              src={logos.personal}
              height={40}
              width={40}
              alt=""
            />
          </div>
          <div>
            <Image
              className="hover:scale-[102%] hover:shadow-md active:scale-95 transition-transform duration-300 ease-in-out cursor-pointer"
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

export default CDemo_Back;
