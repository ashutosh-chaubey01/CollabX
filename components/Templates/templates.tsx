/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { gsap } from "gsap";
import ReactCardFlip from "react-card-flip";

import CardFront1 from "@/components/CardComponents/CardTemplates/Card-1/CardFront1";
import CardBack1 from "@/components/CardComponents/CardTemplates/Card-1/CardBack1";
import CardFront2 from "@/components/CardComponents/CardTemplates/Card-2/CardFront2";
import CardBack2 from "@/components/CardComponents/CardTemplates/Card-2/CardBack2";
import CardFront3 from "@/components/CardComponents/CardTemplates/Card-3/CardFront3";
import CardBack3 from "@/components/CardComponents/CardTemplates/Card-3/CardBack3";
import CardFront4 from "@/components/CardComponents/CardTemplates/Card-4/CardFront4";
import CardBack4 from "@/components/CardComponents/CardTemplates/Card-4/CardBack4";
import CardFront5 from "@/components/CardComponents/CardTemplates/Card-5/CardFront5";
import CardBack5 from "@/components/CardComponents/CardTemplates/Card-5/CardBack5";
import CardFront6 from "@/components/CardComponents/CardTemplates/Card-6/CardFront6";
import CardBack6 from "@/components/CardComponents/CardTemplates/Card-6/CardBack6";

const STYLES = {
  buttonClass:
    "size-10 bg-white/80 rounded-full flex justify-center items-center cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 ease-in-out",
};

const TEMPLATES = {
  front: [
    <CardFront1 key="card1" />,
    <CardFront2 word="CollabX" key="card2" />,
    <CardFront3 key="card3" />,
    <CardFront4 key="card4" />,
    <CardFront5 key="card5" />,
    <CardFront6 key="card6" />,
  ],
  back: [
    <CardBack1 key="card1" />,
    <CardBack2 key="card2" />,
    <CardBack3 key="card3" />,
    <CardBack4 key="card4" />,
    <CardBack5 key="card5" />,
    <CardBack6 key="card6" />,
  ],
};

interface templateProps {
  template: number;
  setTemplate: React.Dispatch<React.SetStateAction<number>>;
}

const Templates = ({ template, setTemplate }: templateProps) => {
  const [currentIndex, setCurrentIndex] = useState(template);
  const [isClicked, setIsClicked] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const hasShownNotifications = useRef(false);

  const carouselRef = useRef<HTMLDivElement>(null);

  const currentTemplate = TEMPLATES.front[currentIndex];
  const prevTemplate =
    TEMPLATES.front[
      (currentIndex - 1 + TEMPLATES.front.length) % TEMPLATES.front.length
    ];
  const nextTemplate =
    TEMPLATES.front[(currentIndex + 1) % TEMPLATES.front.length];

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? TEMPLATES.front.length - 1 : prevIndex - 1
    );
    setIsClicked(false);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === TEMPLATES.front.length - 1 ? 0 : prevIndex + 1
    );
    setIsClicked(false);
  };

  useEffect(() => {
    setTemplate(currentIndex);
  }, [currentIndex, setTemplate]);

  const handleTemplateClick = () => setIsClicked(!isClicked);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!carouselRef.current || !isMounted) return;

    const carousel = carouselRef.current;
    const [prevCard, currentCard, nextCard] = Array.from(carousel.children);

    const animateCards = () => {
      gsap.fromTo(
        currentCard,
        { opacity: 0.5, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: "power1.out" }
      );

      gsap.fromTo(
        [prevCard, nextCard],
        { opacity: 0.5, scale: 0.8 },
        { opacity: 1, scale: 0.7, duration: 1.2, ease: "power1.out" }
      );
    };

    animateCards();
  }, [currentIndex, isMounted]);

  // Handle notifications - only show once
  useEffect(() => {
    if (!isMounted || hasShownNotifications.current) return;

    hasShownNotifications.current = true;
    setShowNotifications(true);

    // Animate in
    const timeline = gsap.timeline();
    timeline.fromTo(
      ".alert",
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.2,
      }
    );

    // Animate out after delay
    timeline.to(".alert", {
      opacity: 0,
      y: -20,
      duration: 0.6,
      ease: "power2.in",
      stagger: 0.1,
      delay: 3,
    });

    // Remove from DOM after animation
    const hideTimeout = setTimeout(() => {
      setShowNotifications(false);
    }, 5000);

    return () => clearTimeout(hideTimeout);
  }, [isMounted]);

  return (
    <div className="relative w-full h-full">
      {isMounted && showNotifications && (
        <div className="fixed flex flex-col justify-center items-center gap-3 top-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="alert py-3 px-6 bg-white/90 backdrop-blur-sm border-white border-[2px] rounded-lg text-gray-800 font-medium font-['Poppins'] text-sm text-center shadow-lg">
            Click the card to flip it
          </div>
          <div className="alert py-3 px-6 bg-white/90 backdrop-blur-sm border-white border-[2px] rounded-lg text-gray-800 font-medium font-['Poppins'] text-sm text-center shadow-lg">
            Click the button at bottom-right to select
          </div>
        </div>
      )}

      <div className="absolute inset-0 flex justify-center items-center">
        <Image
          className="opacity-50"
          src="/assets/images/db-bg.svg"
          width={300}
          height={300}
          alt="Background"
          priority
        />
      </div>

      <div className="relative h-full w-full">
        <div className="h-full w-full flex justify-center items-center">
          <div
            className="w-fit px-24 h-full flex flex-col justify-center items-center gap-10 overflow-y-hidden"
            ref={carouselRef}>
            <div className="blur-[2px] scale-90 flex items-center justify-center">
              {prevTemplate}
            </div>

            <ReactCardFlip flipDirection="vertical" isFlipped={isClicked}>
              <div
                onClick={handleTemplateClick}
                className="h-fit w-fit cursor-pointer">
                {currentTemplate}
              </div>
              <div
                onClick={handleTemplateClick}
                className="h-fit w-fit cursor-pointer">
                {TEMPLATES.back[currentIndex]}
              </div>
            </ReactCardFlip>

            <div className="blur-[2px] scale-90 flex items-center justify-center">
              {nextTemplate}
            </div>
          </div>

          <div className="h-full flex flex-col justify-center items-center gap-8">
            <button className={STYLES.buttonClass} onClick={handlePrevious}>
              <FiChevronUp />
            </button>
            <button className={STYLES.buttonClass} onClick={handleNext}>
              <FiChevronDown />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
