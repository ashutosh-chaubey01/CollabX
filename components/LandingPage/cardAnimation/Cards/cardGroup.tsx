"use client";
import { gsap, Power1 } from "gsap";
import { useEffect, useState } from "react";
import Card from "./card";

function CardGroup() {
  const [isInViewPort, setIsInViewPort] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const myElement = document.getElementById("myElement");
      if (myElement) {
        const bounding = myElement.getBoundingClientRect();
        if (
          bounding.top >= 0 &&
          bounding.left >= 0 &&
          bounding.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          bounding.right <=
            (window.innerWidth || document.documentElement.clientWidth)
        ) {
          setIsInViewPort(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isInViewPort) {
      const tl = gsap.timeline();
      tl.fromTo(
        ".card1",
        { x: -100, y: 50, opacity: 0 },
        {
          x: -100,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: Power1.easeOut,
        }
      )
        .fromTo(
          ".card2",
          { x: 0, y: 75, opacity: 0 },
          {
            x: 0,
            y: -50,
            opacity: 1,
            duration: 1,
            ease: Power1.easeOut,
          },
          "-=0.5"
        )
        .fromTo(
          ".card3",
          { x: 100, y: 100, opacity: 0 },
          {
            x: 100,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: Power1.easeOut,
          },
          "-=0.5"
        );
    }
  }, [isInViewPort]);

  return (
    <div
      id="myElement"
      className="flex justify-center items-center w-screen py-24 overflow-hidden relative">
      <div className="card1 z-10">
        <Card
          heading={"Possibilities"}
          subHeading={
            "We know you love hackathons! Find your team and create infinite possibilities"
          }
        />
      </div>
      <div className="card2 z-20">
        <Card
          heading={"Designs"}
          subHeading={
            "Design your own CollabXCards and let others know of your creativity!"
          }
        />
      </div>
      <div className="card3 z-10">
        <Card
          heading={"Networking"}
          subHeading={
            "Make the best of your time and get LinkedIn out of the picture with a faster alternative"
          }
        />
      </div>
    </div>
  );
}

export default CardGroup;
