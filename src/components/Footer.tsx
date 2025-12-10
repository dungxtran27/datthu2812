import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

interface FooterProps {
  groomName: string;
  brideName: string;
}

export function Footer({ groomName, brideName }: FooterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <footer
      ref={ref}
      className="relative py-16 px-6 bg-[var(--golden-hour)] overflow-hidden"
    >
      {/* Red Thread Knot SVG */}
      <motion.div
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={isInView ? { scale: 1, rotate: 0, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="flex justify-center mb-8"
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          {/* Decorative knot */}
          <motion.circle
            cx="40"
            cy="40"
            r="30"
            stroke="var(--red-thread)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M 40 10 Q 60 20, 60 40 T 40 70 Q 20 60, 20 40 T 40 10"
            stroke="var(--red-thread)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.circle
            cx="40"
            cy="40"
            r="8"
            fill="var(--red-thread)"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 40 40"
              to="360 40 40"
              dur="20s"
              repeatCount="indefinite"
            />
          </motion.circle>
        </svg>
      </motion.div>

      {/* Main Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-center mb-8"
      >
        <p className="font-ephesis text-4xl md:text-5xl text-[var(--red-thread)] mb-4">
          Hẹn gặp lại ngày vui của chúng mình ❤️
        </p>
        <div className="flex items-center justify-center gap-2">
          <div className="h-px w-12 bg-[var(--red-thread)]/30" />
          <p className="text-gray-600">
            {groomName} & {brideName}
          </p>
          <div className="h-px w-12 bg-[var(--red-thread)]/30" />
        </div>
      </motion.div>

      {/* Date */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="text-center mb-8"
      >
        <p className="text-gray-500 text-sm">28 • 12 • 2025</p>
      </motion.div>

      {/* Decorative Hearts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 0.8 }}
        className="flex justify-center gap-3 mb-8"
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 1.2 + i * 0.1, duration: 0.3 }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill={i === 2 ? "var(--red-thread)" : "none"}
              stroke={i === 2 ? "none" : "var(--red-thread)"}
              strokeWidth="1"
            >
              <path d="M6 10.5s-4.5-3.375-4.5-6a2.25 2.25 0 0 1 4.5-1.5 2.25 2.25 0 0 1 4.5 1.5c0 2.625-4.5 6-4.5 6z" />
            </svg>
          </motion.div>
        ))}
      </motion.div>

      {/* Final Thread Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: 1.5, duration: 1 }}
        className="h-px bg-gradient-to-r from-transparent via-[var(--red-thread)]/30 to-transparent max-w-md mx-auto mb-6"
      />

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="text-center"
      >
        <p className="text-xs text-gray-400">Made with love & care</p>
      </motion.div>

      {/* Floating Hearts Animation */}
      {isInView &&
        [...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0, x: 0, opacity: 0 }}
            animate={{
              y: [-20, -100],
              x: [0, (i - 1) * 30],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              delay: 2 + i * 0.8,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            className="absolute bottom-20"
            style={{ left: `${30 + i * 20}%` }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="var(--red-thread)"
              opacity="0.3"
            >
              <path d="M8 14s-6-4.5-6-8a3 3 0 0 1 6-2 3 3 0 0 1 6 2c0 3.5-6 8-6 8z" />
            </svg>
          </motion.div>
        ))}
    </footer>
  );
}
