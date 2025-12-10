import { motion } from "motion/react";
import { useEffect, useState, useRef } from "react";

interface HeroSectionProps {
  heroImage: string;
  groomName: string;
  brideName: string;
}

interface Petal {
  id: number;
  x: number; // horizontal position in percentage
  delay: number; // delay before starting animation
  duration: number; // fall duration
  size: number; // size variation
  rotation: number; // rotation variation
}

export function HeroSection({
  heroImage,
  groomName,
  brideName,
}: HeroSectionProps) {
  const [petals, setPetals] = useState<Petal[]>([]);
  const namesRef = useRef<HTMLDivElement>(null);
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const petalIdRef = useRef(0);

  useEffect(() => {
    const initializePetals = () => {
      const initialPetals: Petal[] = [];
      const petalCount = 15; // Number of petals to show

      for (let i = 0; i < petalCount; i++) {
        initialPetals.push(createRandomPetal(petalIdRef.current++));
      }

      setPetals(initialPetals);
    };

    const timer = setTimeout(initializePetals, 500);
    return () => clearTimeout(timer);
  }, []);

  // Function to create a randomly positioned petal
  const createRandomPetal = (id: number): Petal => ({
    id,
    x: Math.random() * 100, // Random horizontal position (0-100%)
    delay: Math.random() * 5, // Random delay (0-5 seconds)
    duration: 10 + Math.random() * 15, // Random duration (10-25 seconds)
    size: 0.8 + Math.random() * 0.7, // Size multiplier (0.8-1.5)
    rotation: Math.random() * 360, // Random initial rotation
  });

  // Add more petals at intervals
  useEffect(() => {
    const interval = setInterval(() => {
      // Add 1-2 new petals randomly
      const newPetalCount = Math.floor(Math.random() * 2) + 1;
      const newPetals: Petal[] = [];

      for (let i = 0; i < newPetalCount; i++) {
        newPetals.push(createRandomPetal(petalIdRef.current++));
      }

      setPetals((prev) => [...prev, ...newPetals]);

      // Remove old petals to prevent memory issues (keep max 50 petals)
      if (petals.length > 50) {
        setPetals((prev) => prev.slice(-40));
      }
    }, 3000); // Add new petals every 3 seconds

    return () => clearInterval(interval);
  }, [petals.length]);

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

  // Petal animation variants
  const petalVariants = {
    fall: (petal: Petal) => ({
      y: ["0vh", "100vh"],
      x: [`${petal.x}vw`, `${petal.x + (Math.random() * 20 - 10)}vw`],
      rotate: [petal.rotation, petal.rotation + 360 + Math.random() * 180],
      transition: {
        y: {
          duration: petal.duration,
          ease: "linear",
          delay: petal.delay,
        },
        x: {
          duration: petal.duration / 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        },
        rotate: {
          duration: petal.duration / 2,
          ease: "linear",
          repeat: Infinity,
        },
      },
    }),
    fade: (petal: Petal) => ({
      opacity: [0, 0.8, 0.8, 0],
      transition: {
        opacity: {
          duration: petal.duration,
          times: [0, 0.1, 0.9, 1],
          delay: petal.delay,
        },
      },
    }),
  };

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

      {/* Multiple Falling Petals */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            className="fixed -top-4 z-0"
            style={{
              left: `${petal.x}vw`,
              transform: `scale(${petal.size})`,
            }}
            custom={petal}
            variants={petalVariants}
            animate={["fall", "fade"]}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              className="drop-shadow-lg"
            >
              <path
                d="M12 21.5C12 21.5 2 13 2 7.5C2 4.5 4.5 2 7.5 2C10.5 2 12 4.5 12 7.5C12 4.5 13.5 2 16.5 2C19.5 2 22 4.5 22 7.5C22 13 12 21.5 12 21.5Z"
                fill="var(--red-thread)"
                fillOpacity="0.7"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Alternative: Simpler petal animation (uncomment if above is too heavy) */}
      {/* 
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        {petals.slice(0, 10).map((petal) => (
          <div
            key={petal.id}
            className="absolute top-0 animate-petal-fall-simple"
            style={{
              left: `${petal.x}%`,
              animationDelay: `${petal.delay}s`,
              animationDuration: `${petal.duration}s`,
              transform: `scale(${petal.size})`,
            }}
          >
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path
                d="M15 2C15 2 10 8 10 15C10 22 15 28 15 28C15 28 20 22 20 15C20 8 15 2 15 2Z"
                fill="var(--red-thread)"
                opacity="0.7"
              />
            </svg>
          </div>
        ))}
      </div>
      */}

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
