import React from "react";
import { Slide } from "react-awesome-reveal";
import Accordion from "./questions";

function Accordian() {
  const variants = {
    textStyle: "text-[#303030] text-6xl font-bold uppercase tracking-wide",
    textBox: "h-fit py-1 overflow-hidden",
  };

  return (
    <div className="flex flex-col items-start justify-start mb-24">
      <section className="w-screen px-24 flex flex-col justify-center items-start mb-20">
        <div className="flex items-start gap-3">
          <div className="h-[64px] w-fit flex justify-center items-center">
            <div className="h-1 bg-[#2E2E2E]/80 w-24 "></div>
          </div>
          <div className="flex flex-col items-start justify-center">
            <div className={variants.textBox}>
              <Slide direction="up" duration={500}>
                <h1 className={variants.textStyle}>We know</h1>
              </Slide>
            </div>
            <div className={variants.textBox}>
              <Slide direction="up" delay={5} duration={750}>
                <h1 style={{ color: "#969A9A" }} className={variants.textStyle}>
                  What you think
                </h1>
              </Slide>
            </div>
          </div>
        </div>
      </section>
      <Accordion />
    </div>
  );
}

export default Accordian;
