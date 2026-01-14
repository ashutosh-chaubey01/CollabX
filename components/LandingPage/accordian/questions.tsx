"use client";
import { gsap } from "gsap";
import React, { useEffect, useRef, useState } from "react";

interface AccordionItem {
  id: number;
  title: string;
  content: string;
}

const Accordion: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  const toggleAccordion = (id: number) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    contentRefs.current.forEach((content, index) => {
      if (content) {
        // Animate open
        if (activeAccordion === index + 1) {
          gsap.to(content, {
            height: "auto",
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        }
        // Animate close
        else {
          gsap.to(content, {
            height: 0,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
          });
        }
      }
    });
  }, [activeAccordion]);

  const items: AccordionItem[] = [
    {
      id: 1,
      title: "What is CollabX? What does it do?",
      content:
        "CollabX is a platform I created to make the networking process easier for developers. Think of CollabX as a new way of having connections but faster and more efficient!",
    },
    {
      id: 2,
      title: "How do I use CollabX? Do I need a subscription?",
      content:
        "It's simple! Just create an account, set up your profile, make a CollabXCard, and start connecting with other developers! Your CollabXCard Design is completely upto you!!",
    },
    {
      id: 3,
      title: "Why should I use CollabX? I already have LinkedIn.",
      content:
        "Well, CollabX is a great way to meet other developers in your college, find new opportunities with them, and learn from others in your tech community. LinkedIn is more for professional networking, while CollabX is more for personal networking.",
    },
  ];

  return (
    <div className="ml-56 relative text-4xl max-w-5xl">
      {items.map((item, index) => (
        <div key={item.id} className="mt-12 cursor-pointer group">
          <button
            onClick={() => toggleAccordion(item.id)}
            className="flex items-center justify-between text-[#2E2E2E]/90 gap-6 w-full px-5 py-4 font-semibold text-left select-none">
            <span style={{ fontFamily: "var(--font-grifter-bold)" }}>
              {item.title}
            </span>
            <div
              className={`relative flex items-center justify-center w-5 h-5 transition-transform duration-300 ease-out ${
                activeAccordion === item.id ? "rotate-90" : ""
              }`}>
              <div className="absolute w-0.5 h-full bg-neutral-700 rounded-full"></div>
              <div className="absolute w-full h-0.5 bg-neutral-700 rounded-full"></div>
            </div>
          </button>
          <div
            ref={(el) => {
              contentRefs.current[index] = el;
            }}
            className="overflow-hidden opacity-0 h-0">
            <div
              style={{
                color: "#2e2e2e",
                fontFamily: "var(--font-lexend-variable)",
              }}
              className="p-5 pt-0 opacity-70 font-semibold text-lg leading-relaxed whitespace-normal">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
