import { motion } from "motion/react";
import { useInView } from "motion/react";
import { JSX, useRef } from "react";

interface Message {
  username: string;
  message: string;
}

interface MessagesSectionProps {
  messages: Message[];
  isLoading?: boolean;
}

export function MessagesSection({
  messages,
  isLoading = false,
}: MessagesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Create multiple rows of messages with random delays and vertical positions
  const createMessageStream = () => {
    const streams: JSX.Element[] = [];
    const streamCount = 5; // Number of parallel streams

    messages.forEach((msg, idx) => {
      const streamIndex = idx % streamCount;
      // Add some randomness to vertical position within each stream
      const baseVerticalPosition = 12 + streamIndex * 18;
      const verticalJitter = Math.sin(idx * 2.5) * 4; // Slight variation
      const verticalPosition = baseVerticalPosition + verticalJitter;

      // Calculate delay to ensure messages on same stream don't overlap
      const messagesPerStream = Math.ceil(messages.length / streamCount);
      const positionInStream = Math.floor(idx / streamCount);
      const baseDelay = positionInStream * 4; // Space messages 4 seconds apart on same stream
      const delay = baseDelay + streamIndex * 0.8; // Offset different streams

      const duration = 18 + Math.sin(idx) * 2; // Vary speed slightly

      streams.push(
        <motion.div
          key={`${msg.username}-${idx}`}
          initial={{ x: "100vw", opacity: 0 }}
          animate={
            isInView
              ? {
                  x: "-100%",
                  opacity: [0, 1, 1, 0, 1],
                }
              : {}
          }
          transition={{
            duration: duration,
            delay: delay,
            repeat: Infinity,
            repeatDelay: 0, // No gap between cycles - continuous loop
            ease: "linear",
            opacity: {
              times: [0, 0.1, 0.9, 1],
              duration: duration,
            },
          }}
          className="absolute whitespace-nowrap"
          style={{
            top: `${verticalPosition}%`,
          }}
        >
          <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg border border-[var(--red-thread)]/10">
            {/* User initial circle */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[var(--red-thread)]/20 to-[var(--red-thread)]/40 flex items-center justify-center">
              <span className="text-[var(--red-thread)] font-medium text-sm">
                {msg.username.charAt(0).toUpperCase()}
              </span>
            </div>

            {/* Message content */}
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-gray-500 font-medium">
                {msg.username}
              </span>
              <span className="text-sm text-gray-700">{msg.message}</span>
            </div>

            {/* Decorative heart */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="var(--red-thread)"
              opacity="0.4"
              className="flex-shrink-0"
            >
              <path d="M7 12.25s-5.25-3.9375-5.25-7a2.625 2.625 0 0 1 5.25-1.75 2.625 2.625 0 0 1 5.25 1.75c0 3.0625-5.25 7-5.25 7z" />
            </svg>
          </div>
        </motion.div>
      );
    });

    return streams;
  };

  return (
    <section
      ref={ref}
      className="section min-h-screen py-16 px-6 bg-gradient-to-b from-[var(--silk-white)] to-[var(--golden-hour)] relative overflow-hidden "
    >
      {/* Paper texture overlay */}
      <div className="absolute inset-0 paper-texture opacity-30" />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >
        <h2 className="font-great text-5xl md:text-6xl text-[var(--red-thread)] mb-3">
          Lời Chúc Từ Mọi Người
        </h2>
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-[var(--red-thread)]/30" />
          <p className="text-gray-600 text-sm italic">
            Những lời chúc phúc dành cho chúng mình
          </p>
          <div className="h-px w-16 bg-[var(--red-thread)]/30" />
        </div>
      </motion.div>

      {/* Messages Board - Scrolling Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative h-[500px] border-2 border-[var(--red-thread)]/20 rounded-2xl bg-white/40 backdrop-blur-sm overflow-hidden shadow-2xl"
      >
        {/* Decorative corners */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[var(--red-thread)]/30 rounded-tl-lg" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[var(--red-thread)]/30 rounded-tr-lg" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[var(--red-thread)]/30 rounded-bl-lg" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[var(--red-thread)]/30 rounded-br-lg" />

        {/* Flying messages */}
        <div className="absolute inset-0">{createMessageStream()}</div>

        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white/60 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white/60 to-transparent pointer-events-none z-10" />
      </motion.div>

      {/* Bottom decorative element */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.6, duration: 1 }}
        className="mt-8 h-0.5 bg-gradient-to-r from-transparent via-[var(--red-thread)]/20 to-transparent max-w-2xl mx-auto"
      />
    </section>
  );
}
