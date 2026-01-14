"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import Nav from "@/components/navbar/nav";
import Hero from "@/components/LandingPage/hero/hero";
import HeroVideo from "@/components/LandingPage/hero/heroVideo";
import CardAnimation from "@/components/LandingPage/cardAnimation/cardAnimation";
import Accordian from "@/components/LandingPage/accordian/accordian";
import Footer from "@/components/LandingPage/footer/footer";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const navbarRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 800);
    });

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center z-0">
      <div
        ref={navbarRef}
        className="fixed z-30 w-screen px-12 backdrop-blur-md top-0 navbar">
        <Nav />
      </div>
      <div className="pt-32 mx-24 mb-32">
        <Hero />
      </div>
      <HeroVideo />
      <CardAnimation />
      <Accordian />
      <Footer />
    </div>
  );
}
