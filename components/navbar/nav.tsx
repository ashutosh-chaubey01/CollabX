"use client";
import Image from "next/image";
import router from "next/router";
import { useEffect, useState } from "react";

function Nav() {
  const [logging, setLogging] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const verifySession = async () => {
      try {
        const response = await fetch("/api/auth/session", {
          credentials: "include",
          signal: controller.signal,
        });
        if (!response.ok) {
          router.push("/auth");
          return;
        }
        setLogging(true);
      } catch (error) {
        console.error("Error verifying session:", error);
      }
    };

    void verifySession();
    return () => controller.abort();
  }, []);

  const variants = {
    navStyle:
      "uppercase pb-[1px] text-[#2E2E2E]/60 font-bold text-xs tracking-wider hover:text-[#2E2E2E] hover:border-b-2 hover:border-[#2E2E2E] hover:scale-[102%] active:scale-95 transition-colors duration-200 ease-in-out",
    logoStyle:
      "uppercase text-[#2E2E2E] font-bold text-md tracking-wider hover:text-[#2E2E2E] hover:scale-[102%] active:scale-95 transition-colors duration-200 ease-in-out",
    container: "flex justify-center items-center gap-6",
  };

  return (
    <nav
      className="flex justify-between items-center border-b-2 border-[#2E2E2E]/80 py-4 px-8"
      style={{ fontFamily: "var(--font-grifter-bold)" }}>
      <div className={variants.container}>
        <a className={variants.navStyle} href="#">
          Home
        </a>
        <a className={variants.navStyle} href="#">
          About
        </a>
      </div>
      <div className="flex justify-center items-center gap-2">
        <Image src="/assets/icons/logo.svg" width={30} height={30} alt="" />
        <a className={variants.logoStyle} href="/dashboard-personal">
          Dashboard
        </a>
      </div>
      <div className={variants.container}>
        <a className={variants.navStyle} href="/contact">
          Contact
        </a>
         <a className={variants.navStyle} href="/explore-projects">
          Explore Projects
        </a>
        <a className={variants.navStyle} href="/explore">
          Hackathon
        </a>
        {!logging ? (
          <a className={variants.navStyle} href="/auth">
            Join
          </a>
        ) : (
          <a className={variants.navStyle} href="/profile">
            Hi, Buddy!
          </a>
        )}
      </div>
    </nav>
  );
}

export default Nav;
