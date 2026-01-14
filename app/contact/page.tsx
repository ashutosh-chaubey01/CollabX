"use client";
import { motion } from "framer-motion";
import { ExternalLink, Mail } from "lucide-react";
import { useState } from "react";

function Contact() {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const socials = [
    { name: "Instagram", url: "#" },
    { name: "Facebook", url: "#" },
    { name: "LinkedIn", url: "#" },
    { name: "Pinterest", url: "#" },
    { name: "Twitter", url: "#" },
    { name: "Youtube", url: "#" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-white">
      {/* Navbar placeholder */}
      <div className="h-20 w-full border-b border-[#303030]/10" />

      <main className="h-[calc(100vh-5rem)] w-full flex">
        {/* Left Section */}
        <motion.div
          className="flex-1 flex flex-col justify-center px-16 border-r border-[#303030]/10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}>
          <motion.div variants={titleVariants} className="mb-12">
            <motion.p
              className="text-[100px] leading-none font-bold text-[#303030] uppercase mb-4"
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                letterSpacing: "-0.02em",
              }}>
              get in
            </motion.p>
            <motion.p
              className="text-[100px] leading-none font-bold text-[#303030] uppercase"
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                letterSpacing: "-0.02em",
              }}>
              touch
            </motion.p>
          </motion.div>

          <motion.div variants={itemVariants} className="group">
            <motion.div
              className="flex items-center gap-4 cursor-pointer"
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3 }}>
              <Mail className="w-6 h-6 text-[#303030]/60" />
              <h1
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                className="text-4xl font-semibold text-[#303030] group-hover:text-[#303030]/80 transition-colors duration-300">
                HelloCollabX@gmail.com
              </h1>
            </motion.div>
            <motion.div
              className="h-[2px] bg-[#303030] mt-4"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 0.6 }}
            />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-8 text-lg text-[#303030]/60 max-w-md"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
            If its smooth, say it - if its rough, flag it
          </motion.p>
        </motion.div>

        {/* Right Section - Socials */}
        <motion.div
          className="flex-1 flex items-center justify-center px-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}>
          <div className="w-full max-w-lg">
            <motion.h3
              variants={itemVariants}
              className="text-sm uppercase tracking-widest text-[#303030]/40 mb-8 font-medium"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
              Connect With Us
            </motion.h3>

            <div className="space-y-2">
              {socials.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(-1)}
                  className="block group">
                  <motion.div
                    className="flex items-center justify-between py-4 px-6 rounded-lg relative overflow-hidden"
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.3 }}>
                    <motion.div
                      className="absolute inset-0 bg-[#303030]/5"
                      initial={{ x: "-100%" }}
                      animate={{ x: hoveredIndex === index ? 0 : "-100%" }}
                      transition={{ duration: 0.3 }}
                    />

                    <span
                      style={{
                        fontFamily: "system-ui, -apple-system, sans-serif",
                      }}
                      className="text-2xl font-medium text-[#303030] relative z-10">
                      {social.name}
                    </span>

                    <motion.div
                      animate={{
                        rotate: hoveredIndex === index ? -45 : 0,
                        scale: hoveredIndex === index ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}>
                      <ExternalLink className="w-5 h-5 text-[#303030]/40 group-hover:text-[#303030] transition-colors" />
                    </motion.div>
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </main>

      {/* Decorative Elements */}
      <motion.div
        className="fixed bottom-8 left-8 w-32 h-32 rounded-full border-2 border-[#303030]/10"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="fixed top-32 right-16 w-24 h-24 rounded-full border-2 border-[#303030]/10"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

export default Contact;
