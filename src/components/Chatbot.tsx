"use client";

import { Bot } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const transition = {
    duration: 0.35,
    ease: [0.59, 0, 0.35, 1],
  };

  const enteringState = {
    rotateX: 0,
    skewY: 0,
    height: "100vh",
    width: "100vw",
    scaleY: 1,
    scaleX: 1,
    borderRadius: 0,
    y: 0,
    transition: {
      ...transition,
      y: { type: "spring", visualDuration: 0.7, bounce: 0.2 },
    },
  };

  const exitingState = {
    rotateX: 0,
    height: "50vh",
    width: "50vw",
    skewY: 0,
    scaleY: 0,
    scaleX: 0.3,
    borderRadius: "100%",
    y: 100,
  };

  return (
    <>
      {
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={exitingState}
              animate={enteringState}
              exit={exitingState}
              transition={transition}
              style={{
                transformPerspective: 1000,
                transformStyle: "preserve-3d",
                originX: 1,
                originY: 2,
                height: "100vh",
                width: "100vw",
              }}
              className="fixed top-0 left-0 bg-secondary flex items-center justify-center z-10"
            >
              <div className="text-white text-center min-w-full place-items-center flex flex-col gap-4 text-2xl">
                TESTE
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      }
      <motion.button
        className="z-20 hover:cursor-pointer rounded-full place-items-center"
        type="button"
        initial={{ scale: 1 }}
        whileHover={{
          scale: 1.1,
          backgroundColor: isChatOpen ? "var(--primary)" : "var(--secondary)",
        }}
        transition={{
          duration: 0.2,
          type: "spring",
          bounce: 0.2,
          backgroundColor: { visualDuration: 0.3, y: 0 },
        }}
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <Bot className="text-white z-30" size={35} />
      </motion.button>
    </>
  );
}
