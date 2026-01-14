"use client";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useState } from "react";

function Page1() {
  const [isMounted, setIsMounted] = useState(false);
  const variants = {
    textStyle:
      "textStyle text-[#303030] text-8xl font-bold text-center uppercase tracking-wide",
    textBox: "h-fit py-1 overflow-hidden mb-3",
    miniText: "miniText text-[#2E2E2E]/60 font-regular text-base tracking-wide",
  };
  useEffect(() => {
    setIsMounted(true);
    const tl = gsap.timeline();
    if (isMounted) {
      tl.fromTo(
        ".textStyle",
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1 }
      )
        .fromTo(
          ".miniText",
          { opacity: 0, x: -100 },
          { opacity: 1, x: 0, duration: 0.3 }
        )
        .fromTo(".network", { opacity: 0 }, { opacity: 1, duration: 0.25 })
        .fromTo(
          ".arrow",
          { opacity: 0, x: -100 },
          { opacity: 1, x: 0, duration: 0.35 }
        )
        .fromTo(
          ".circle",
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.35 }
        );
    }
    return () => {
      tl.kill();
    };
  }, [isMounted]);
  if (!isMounted) return null;
  return (
    <div
      className="flex flex-col justify-center items-start"
      style={{ fontFamily: "var(--font-grifter-bold)" }}>
      <div className="flex justify-center items-center gap-5 mb-3">
        <div className={variants.textBox}>
          <h1 className={variants.textStyle}>CollabX</h1>
        </div>
        <div className={variants.textBox}>
          <p className={variants.miniText}>
            What will it mean to connect to all your <br /> college peers with
            just a click of your fingers?
          </p>
        </div>
      </div>
      <div className={variants.textBox}>
        <h1 className={variants.textStyle} style={{ color: "#969A9A" }}>
          helps you network
        </h1>
      </div>
      <div className="flex justify-center items-center gap-5">
        <div className={variants.textBox}>
          <Image
            className="mr-5 network"
            src="/assets/icons/network.png"
            width={100}
            height={100}
            alt=""
          />
        </div>
        <div className={variants.textBox}>
          <p className={variants.textStyle}>faster</p>
        </div>
        <div
          className={variants.textBox}
          style={{
            position: "relative",
            width: "110px",
            height: "110px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Image
            className="arrow z-10 absolute"
            src="/assets/icons/arrow.png"
            width={110}
            height={110}
            alt=""
          />
          <div
            className="circle z-0 h-[70px] w-[70px] bg-[#969A9A]/60 rounded-full absolute"
            style={{ left: "40px" }}></div>
        </div>
        <div className={variants.textBox}>
          <h1 className={variants.textStyle}>through</h1>
        </div>
      </div>
      <div className={variants.textBox}>
        <h1 className={variants.textStyle}>just a click</h1>
      </div>
    </div>
  );
}
export default Page1;
