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

function CardBack4({
  linkedin,
  twitter,
  personal,
  instagram,
  name,
  jobTitle,
  bio,
  bgColor,
  textColor,
  smallFontSize,
}: CardProps) {
  const logos = {
    linkedin: "/assets/logo/black_logos/linkedin_black.svg",
    twitter: "/assets/logo/black_logos/twitter_black.svg",
    personal: "/assets/logo/black_logos/personal_black.svg",
    qr: "/assets/logo/black_logos/qr_black.svg",
  };

  const design = {
    text: "font-medium font-['Inter'] opacity-80 text-xs",
  };

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="h-[300px] w-[500px] p-5 flex justify-center items-center gap-5 rounded-sm shadow-md overflow-hidden">
      <div className="w-full h-full flex justify-center items-center py-1 gap-4">
        <div className="grid grid-cols-2 grid-rows-2 gap-2 place-self-center">
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
        <div
          style={{ backgroundColor: bgColor }}
          className="w-[2px] h-1/3 opacity-60"></div>
        <div className="flex flex-col justify-normal items-start">
          <p
            style={{
              paddingBottom: "8px",
              fontSize: smallFontSize ?? undefined,
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
            className={design.text}>
            {jobTitle}
          </p>
          <p
            style={{
              color: textColor,
              fontSize: smallFontSize ?? undefined,
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
            className={design.text}>
            {name}
          </p>
          <p
            style={{
              color: textColor,
              fontSize: smallFontSize ?? undefined,
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
            className={design.text}>
            {bio}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardBack4;
