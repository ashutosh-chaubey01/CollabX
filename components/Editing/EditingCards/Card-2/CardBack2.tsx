import Image from "next/image";

interface CardProps {
  linkedin: string;
  twitter: string;
  personal: string;
  instagram: string;
  name: string;
  jobTitle: string;
  bio: string;
  bgColor: string;
  textColor: string;
  smallFontSize?: string;
}

function CardBack2({
  linkedin,
  twitter,
  personal,
  instagram,
  name,
  jobTitle,
  bio,
  textColor,
  bgColor,
  smallFontSize,
}: CardProps) {
  const logos = {
    linkedin: "/assets/logo/black_logos/linkedin_black.svg",
    twitter: "/assets/logo/black_logos/twitter_black.svg",
    personal: "/assets/logo/black_logos/personal_black.svg",
    qr: "/assets/logo/black_logos/qr_black.svg",
  };

  return (
    <div
      style={{
        borderColor: `${bgColor}80`,
        backgroundColor: bgColor,
      }}
      className="h-[300px] w-[500px] border-2 p-5 flex flex-col justify-between items-center rounded-sm shadow-md">
      <div className="w-full flex justify-between items-start">
        <div className="flex flex-col items-start justify-center">
          <p
            style={{
              fontSize: smallFontSize ?? undefined,
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
            className="text-base font-semibold font-['Poppins']">
            {name}
          </p>
          <p
            style={{
              color: textColor,
              fontSize: smallFontSize ?? undefined,
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
            className="text-sm font-medium opacity-80 font-['Poppins']">
            {jobTitle}
          </p>
        </div>
      </div>

      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col justify-center items-start gap-[2px] text-center">
          <p
            style={{
              color: textColor,
              fontSize: smallFontSize ?? undefined,
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
            className="text-xs font-medium opacity-80 font-['Poppins']">
            {bio}
          </p>
          <p
            style={{
              color: textColor,
              fontSize: smallFontSize ?? undefined,
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
            className="text-xs font-medium opacity-80 font-['Poppins']">
            You can customize me!
          </p>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-2 place-self-end">
          <div className="hover:shadow-md">
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              <Image
                className="hover:scale-[102%] active:scale-95 transition-transform duration-300 ease-in-out cursor-pointer"
                src={logos.linkedin}
                height={40}
                width={40}
                alt="LinkedIn"
              />
            </a>
          </div>
          <div className="hover:shadow-md">
            <a href={twitter} target="_blank" rel="noopener noreferrer">
              <Image
                className="hover:scale-[102%] active:scale-95 transition-transform duration-300 ease-in-out cursor-pointer"
                src={logos.twitter}
                height={40}
                width={40}
                alt="Twitter"
              />
            </a>
          </div>
          <div className="hover:shadow-md">
            <a href={personal} target="_blank" rel="noopener noreferrer">
              <Image
                className="hover:scale-[102%] active:scale-95 transition-transform duration-300 ease-in-out cursor-pointer"
                src={logos.personal}
                height={40}
                width={40}
                alt="Personal"
              />
            </a>
          </div>
          <div className="hover:shadow-md">
            <a href={instagram} target="_blank" rel="noopener noreferrer">
              <Image
                className="hover:scale-[102%] active:scale-95 transition-transform duration-300 ease-in-out cursor-pointer"
                src={logos.qr}
                height={40}
                width={40}
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardBack2;
