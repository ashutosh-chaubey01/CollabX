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

function CardBack1({
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
  const design = {
    text1:
      "font-['DM-Sans'] font-semibold text-sm tracking-wide uppercase opacity-80",
    text2:
      "font-['DM-Sans'] font-semibold text-[8px] tracking-wide uppercase opacity-80",
    logo: "hover:scale-[102%] active:scale-95 transition-transform duration-300 ease-in-out cursor-pointer",
  };

  const logos = {
    linkedin: "/assets/logo/black_logos/linkedin_black.svg",
    twitter: "/assets/logo/black_logos/twitter_black.svg",
    personal: "/assets/logo/black_logos/personal_black.svg",
    qr: "/assets/logo/black_logos/qr_black.svg",
  };

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="h-[300px] w-[500px] rounded-sm shadow-md p-8 flex justify-between">
      <div className="h-full flex flex-col justify-between items-start">
        <div className="flex flex-col items-start justify-start">
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
        <p
          style={{ color: textColor }}
          className="text-2xl font-bold text-gray-900 font-['Urbanist']">
          Devlink.
        </p>
      </div>

      <div className="grid grid-cols-2 grid-rows-2 gap-2 place-self-end">
        <a
          className={design.logo}
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer">
          <Image src={logos.linkedin} height={40} width={40} alt="LinkedIn" />
        </a>
        <a
          className={design.logo}
          href={twitter}
          target="_blank"
          rel="noopener noreferrer">
          <Image src={logos.twitter} height={40} width={40} alt="Twitter" />
        </a>
        <a
          className={design.logo}
          href={personal}
          target="_blank"
          rel="noopener noreferrer">
          <Image src={logos.personal} height={40} width={40} alt="Personal" />
        </a>
        <a
          className={design.logo}
          href={instagram}
          target="_blank"
          rel="noopener noreferrer">
          <Image src={logos.qr} height={40} width={40} alt="" />
        </a>
      </div>
    </div>
  );
}

export default CardBack1;
