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

function CardBack3({
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
      style={{ backgroundColor: bgColor }}
      className="h-[300px] w-[500px] p-4 opacity-90 flex flex-col justify-between items-start rounded-sm shadow-md overflow-hidden">
      <div className="w-full flex justify-between items-center">
        <p
          style={{
            color: textColor,
            fontSize: smallFontSize ?? undefined,
            overflowWrap: "break-word",
            wordBreak: "break-word",
          }}
          className="uppercase text-xl font-semibold font-['Inter']">
          {name}
        </p>
        <Image src="/assets/icons/logo.svg" width={50} height={50} alt="logo" />
      </div>
      <div className="w-full flex flex-col justify-center items-start gap-5">
        <div className="w-full flex flex-col justify-start items-start">
          <p
            style={{
              color: textColor,
              fontSize: smallFontSize ?? undefined,
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
            className="text-xs font-medium opacity-80">
            {jobTitle}
          </p>
        </div>
        <div className="w-full flex flex-col justify-start items-start gap-1">
          <p
            style={{
              color: textColor,
              fontSize: smallFontSize ?? undefined,
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
            className="text-xs font-medium opacity-80">
            {bio}
          </p>
          <div className="flex justify-start items-center gap-2">
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
              <a href={instagram} target="_blank" rel="noopener noreferrer"></a>
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
