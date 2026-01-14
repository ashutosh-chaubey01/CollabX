import React from "react";
import Image from "next/image";

const logos = {
  linkedin: "/assets/logo/golden_logos/linkedin_golden.svg",
  twitter: "/assets/logo/golden_logos/twitter_golden.svg",
  personal: "/assets/logo/golden_logos/personal_golden.svg",
  qr: "/assets/logo/golden_logos/qr_golden.svg",
};

const design = {
  logo: "hover:scale-[102%] hover:shadow-md active:scale-95 transition-transform duration-300 ease-in-out cursor-pointer",
  smallText: "text-sm text-[#AF9E77]/70",
};

interface CardProps {
  linkedin: string;
  twitter: string;
  personal: string;
  name: string;
  jobTitle: string;
  bio: string;
  instagram: string;
  bgColor: string;
  textColor: string;
  smallFontSize?: string;
}

function CardBack6({
  linkedin,
  twitter,
  personal,
  name,
  jobTitle,
  bio,
  instagram,
  bgColor,
  textColor,
  smallFontSize,
}: CardProps) {
  return (
    <div
      id="card-back"
      style={{
        backgroundColor: bgColor,
        borderColor: `${bgColor}40`,
      }}
      className="h-[300px] w-[500px] px-8 py-5  border-2 flex flex-col justify-center items-center">
      <div className="h-full w-full flex flex-col justify-center items-start gap-1">
        <p
          style={{
            color: textColor,
            fontSize: smallFontSize ?? undefined,
            overflowWrap: "break-word",
            wordBreak: "break-word",
          }}
          className="text-4xl font-medium italic">
          {name}
        </p>
        <p
          style={{
            fontSize: smallFontSize ?? undefined,
            overflowWrap: "break-word",
            wordBreak: "break-word",
          }}
          className="font-normal text-sm opacity-70 italic">
          {jobTitle}
        </p>
      </div>
      <div className="w-full h-[200px] flex justify-center items-center">
        <div
          style={{
            backgroundColor: bgColor,
            borderColor: `${bgColor}40`,
          }}
          className="h-full w-1/2 border-t-2 border-b-2 border-r-2 flex flex-col justify-center items-start">
          <p
            style={{
              backgroundColor: bgColor,
              borderColor: `${bgColor}40`,
              fontSize: smallFontSize ?? undefined,
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
            className={design.smallText}>
            {bio}
          </p>
        </div>
        <div
          style={{
            backgroundColor: bgColor,
            borderColor: `${bgColor}40`,
          }}
          className="h-full w-1/2 border-t-2 border-b-2 grid grid-cols-2 grid-rows-2 place-items-center">
          <div>
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              <Image
                className={design.logo}
                src={logos.linkedin}
                height={40}
                width={40}
                alt=""
              />
            </a>
          </div>
          <div>
            <a href={twitter} target="_blank" rel="noopener noreferrer">
              <Image
                className={design.logo}
                src={logos.twitter}
                height={40}
                width={40}
                alt=""
              />
            </a>
          </div>
          <div>
            <a href={personal} target="_blank" rel="noopener noreferrer">
              <Image
                className={design.logo}
                src={logos.personal}
                height={40}
                width={40}
                alt=""
              />
            </a>
          </div>
          <div>
            <a href={instagram} target="_blank" rel="noopener noreferrer">
              <Image
                className={design.logo}
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

export default CardBack6;
