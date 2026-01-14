import Image from "next/image";

function Footer() {
  const variants = {
    textStyle:
      "textStyle text-[#303030] text-base font-bold text-center uppercase tracking-wide",
  };

  return (
    <footer className="pt-5 border-t-2 border-[#2E2E2E]/30 mx-4 mb-3 w-full">
      <div className="w-full mx-auto max-w-screen-xl p-4 flex items-center justify-between">
        <div className="flex justify-center items-center gap-2">
          <Image src="/assets/icons/logo.svg" alt="" width={30} height={30} />
          <span
            style={{ fontFamily: "var(--font-grifter-bold)" }}
            className={variants.textStyle}>
            CollabX
          </span>
        </div>
        <ul className="flex items-center gap-5 text-sm font-medium text-gray-500 sm:mt-0">
          <li>
            <a href="#" className="cursor-pointer hover:text-gray-800">
              About
            </a>
          </li>
          <li>
            <a href="#" className="cursor-pointer hover:text-gray-800">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="cursor-pointer hover:text-gray-800">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="cursor-pointer hover:text-gray-800">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
