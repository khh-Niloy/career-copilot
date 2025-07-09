"use client";
import React from "react";

import { AnimatePresence, motion } from "motion/react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

export function CanvasRevealEffectDemo() {
  return (
    <>
      <div className="h-full w-full rounded-lg overflow-hidden">
        <Card>
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-black"
            colors={[
              [236, 72, 153],
              [232, 121, 249],
            ]}
            dotSize={2}
          />
          {/* Radial gradient for the cute fade */}
          <div className="absolute rounded-lg inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
        </Card>
      </div>
    </>
  );
}

const Card = ({ children }: { children?: React.ReactNode }) => {
  const [hovered, setHovered] = React.useState(true);
  return (
    <div
      onMouseEnter={() => setHovered(false)}
      onMouseLeave={() => setHovered(true)}
      className="h-full w-full rounded-lg overflow-hidden  dark:border-white/[0.2] group/canvas-card flex items-center justify-center relative"
    >
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <h1
          className={`${
            !hovered ? "hidden" : ""
          } text-xl font-semibold z-50 text-white`}
        >
          Coming Soon!
        </h1>
      </div>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0 rounded-lg"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 rounded-lg text-center">
        {/* <h2 className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200"> */}
        <h1 className="text-2xl font-semibold">Dont have resume?</h1>
        <h2>Create now!</h2>
        {/* </h2> */}
      </div>
    </div>
  );
};
