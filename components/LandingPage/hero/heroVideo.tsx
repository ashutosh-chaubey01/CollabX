"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

function HeroVideo() {
  const variants = {
    textStyle1:
      "text-6xl font-bold text-center uppercase tracking-wide text-white flex flex-col justify-center items-start gap-4",
    spanStyle1: "text-6xl font-bold text-center uppercase tracking-wide",
    textBox1: "h-fit py-1 overflow-hidden mb-3",
    miniText1:
      "font-regular text-base tracking-wide text-white/60 leading-normal",
  };

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const videoTL = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "top 20%",
        scrub: 1,
        onUpdate: (self) => {
          setIsFullScreen(self.progress > 0.5);
        },
      },
    });

    videoTL.to(videoRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
      duration: 1,
      ease: "power1.in",
    });

    const textTL = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 40%",
        end: "top 20%",
        toggleActions: "play none none reverse",
      },
    });

    textTL
      .fromTo(
        ".textBox1",
        {
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.25,
          ease: "power1.in",
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.25,
          ease: "power1.Out",
        }
      )
      .fromTo(
        ".miniText1",
        {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power1.in",
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power1.Out",
        }
      );

    return () => {
      videoTL.kill();
      textTL.kill();
    };
  }, [isClient]);

  if (!isClient) return null;

  return (
    <div ref={containerRef} className="relative mb-32 h-screen">
      <video
        ref={videoRef}
        src="/assets/videos/network.mp4"
        className="networkVideo relative brightness-50 object-cover"
        autoPlay
        muted
        loop
        style={{
          width: "600px",
          height: "400px",
          transition: "opacity 0.3s ease",
        }}
      />

      <div
        ref={textRef}
        style={{ fontFamily: "var(--font-grifter-bold)" }}
        className={`flex flex-col justify-center items-start ml-12 absolute top-12 transition-opacity duration-300 ${
          isFullScreen ? "opacity-100" : "opacity-0"
        }`}>
        <div className={`${variants.textBox1} textBox1`}>
          <h1 className={variants.textStyle1}>
            We make networking <br />
            <span className={variants.spanStyle1} style={{ color: "#969A9A" }}>
              efficient
            </span>
          </h1>
        </div>

        <div className={`${variants.textBox1} textBox1`}>
          <h1 className={variants.textStyle1}>and faster.</h1>
        </div>

        <div className={`${variants.textBox1} miniText1`}>
          <p
            className={variants.miniText1}
            style={{ fontFamily: "var(--font-lexend-variable)" }}>
            CollabX makes it easy to connect with your college peers. have a
            chat, <br /> share ideas, and collaborate on projects. <br />
            Get all your peers in one place. No{" "}
            <span className=" underline text-[#303030] bg-white/40 py-[2px] px-1 font-semibold rounded-md hover:bg-blue-600 hover:text-white hover:shadow-md hover:cursor-pointer transition-all duration-200 ease-linear">
              LinkedIn
            </span>{" "}
            needed!
          </p>
        </div>
      </div>
    </div>
  );
}

export default HeroVideo;
