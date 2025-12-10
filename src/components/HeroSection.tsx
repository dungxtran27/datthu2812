import { motion } from "motion/react";
import { useEffect, useState, useRef } from "react";

interface HeroSectionProps {
  heroImage: string;
  groomName: string;
  brideName: string;
}

export function HeroSection({
  heroImage,
  groomName,
  brideName,
}: HeroSectionProps) {
  const [showPetal, setShowPetal] = useState(false);
  const namesRef = useRef<HTMLDivElement>(null);
  const [underlineWidth, setUnderlineWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPetal(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Measure the width of the names for the underline
  useEffect(() => {
    const updateWidth = () => {
      if (namesRef.current) {
        setUnderlineWidth(namesRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero Image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <div className="relative w-full h-full animate-heartbeat">
          <img
            src={heroImage}
            alt="Wedding couple"
            className="w-full h-full object-cover"
          />
          {/* Soft vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        </div>
      </motion.div>

      {/* Falling Petal */}
      {showPetal && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 animate-petal-fall pointer-events-none">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path
              d="M15 2C15 2 10 8 10 15C10 22 15 28 15 28C15 28 20 22 20 15C20 8 15 2 15 2Z"
              fill="var(--red-thread)"
              opacity="0.7"
            />
          </svg>
        </div>
      )}

      {/* Names with Red Thread */}
      <div className="absolute inset-0 flex items-end md:items-center justify-center z-10 pb-32 md:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="relative text-center px-8"
        >
          {/* Red Thread Line Above */}
          <svg
            className="absolute -top-20 left-1/2 -translate-x-1/2 hidden md:block"
            width="2"
            height="80"
            viewBox="0 0 2 80"
          >
            <motion.line
              x1="1"
              y1="0"
              x2="1"
              y2="80"
              stroke="var(--red-thread)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
            />
          </svg>

          <div className="relative bg-white/95 backdrop-blur-sm px-8 md:px-12 py-6 md:py-8 rounded-lg shadow-2xl">
            <div className="relative">
              <motion.div
                ref={namesRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="font-ephesis text-4xl sm:text-5xl md:text-8xl text-[var(--red-thread)] whitespace-nowrap"
              >
                {groomName} &amp; {brideName}
              </motion.div>

              {/* Cursive Red Thread Underline - Full length */}
              <div className="absolute -bottom-4 left-0 right-0 flex justify-center">
                {/* Mobile fallback - simpler straight line */}
                <motion.div
                  className="md:hidden h-[1.5px] bg-[var(--red-thread)]"
                  style={{ width: underlineWidth * 0.9 }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 2, duration: 1.5, ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Thread */}
          <svg
            className="absolute -bottom-20 left-1/2 -translate-x-1/2 hidden md:block"
            width="2"
            height="80"
            viewBox="0 0 2 80"
          >
            <motion.line
              x1="1"
              y1="0"
              x2="1"
              y2="80"
              stroke="var(--red-thread)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1 h-2 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
