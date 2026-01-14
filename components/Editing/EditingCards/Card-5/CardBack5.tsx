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

function CardBack5({
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
    logo: "hover:scale-[102%] active:scale-95 transition-transform duration-300 ease-in-out cursor-pointer",
    text1: "text-xs font-semibold opacity-90 font-['Inter']",
    text2: "text-xs font-medium opacity-80 font-['Inter']",
  };

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="h-[300px] w-[500px] p-5 flex justify-between items-center gap-5 rounded-sm shadow-md overflow-hidden">
      <div className="h-full flex flex-col justify-end items-start gap-3">
        <div className="flex flex-col justify-start items-start">
          <p
            style={{
              color: textColor,
              fontSize: smallFontSize ?? undefined,
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
            className={design.text1}>
            {name}
          </p>
          <p
            style={{
              color: textColor,
              fontSize: smallFontSize ?? undefined,
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
            className={design.text2}>
            {jobTitle}
          </p>
        </div>
        <div className="flex flex-col justify-start items-start">
          <p
            style={{
              color: textColor,
              fontSize: smallFontSize ?? undefined,
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
            className={design.text2}>
            {bio}
          </p>
        </div>
      </div>
      <div className="h-full flex flex-col justify-end items-end gap-2">
        <div className="hover:shadow-md">
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <Image
              className={design.logo}
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
              className={design.logo}
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
              className={design.logo}
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
  );
}

export default CardBack5;
