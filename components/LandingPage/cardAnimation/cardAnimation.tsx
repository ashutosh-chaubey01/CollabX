"use client";
import React, { useState, useEffect } from "react";
import { Slide } from "react-awesome-reveal";
import CardGroup from "./Cards/cardGroup";

function CardAnimation() {
  const [isInViewPort, setIsInViewPort] = useState(false);
  const variants = {
    textStyle:
      "textStyle text-[#303030] text-8xl font-bold text-center uppercase tracking-wide text-[#2E2E2E]",
    textBox: "h-fit py-1 overflow-hidden mb-5",
    miniText:
      "miniText text-[#2E2E2E]/60 font-semibold text-xl text-center tracking-wide px-3",
  };

  useEffect(() => {
    const handleScroll = () => {
      const myElement = document.getElementById("myElement");
      if (myElement) {
        const bounding = myElement.getBoundingClientRect();
        if (
          (bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.right <= window.innerWidth) ||
          bounding.bottom <= window.innerHeight
        ) {
          setIsInViewPort(true);
        } else {
          setIsInViewPort(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-12 mt-12 mb-32">
      <div id="myElement" className={variants.textBox}>
        {isInViewPort && (
          <Slide direction="up">
            <h1
              style={{ fontFamily: "var(--font-grifter-bold)" }}
              className={variants.textStyle}>
              We{" "}
              <span className={variants.textStyle} style={{ color: "#969A9A" }}>
                optimize
              </span>{" "}
              your <br /> networking
            </h1>
          </Slide>
        )}
      </div>
      <div className={variants.textBox}>
        {isInViewPort && (
          <Slide direction="up" triggerOnce>
            <p className={variants.miniText}>
              We have created an intuitive and functional platform for you to
              connect with your college peers faster than ever! <br />
              No need to search up your peers on LinkedIn anymore!
            </p>
          </Slide>
        )}
      </div>
      <CardGroup />
    </div>
  );
}

export default CardAnimation;
