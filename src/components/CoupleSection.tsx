import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

interface CoupleSectionProps {
  groomImage: string;
  brideImage: string;
  groomName: string;
  brideName: string;
  groomQuote: string;
  brideQuote: string;
}

export function CoupleSection({
  groomImage,
  brideImage,
  groomName,
  brideName,
  groomQuote,
  brideQuote,
}: CoupleSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-[var(--golden-hour)] relative overflow-hidden">
      {/* Red Thread Background */}
      <svg className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2" viewBox="0 0 1000 2">
        <motion.line
          x1="0"
          y1="1"
          x2="1000"
          y2="1"
          stroke="var(--red-thread)"
          strokeWidth="1"
          strokeDasharray="5,5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.3 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-ephesis text-5xl md:text-6xl text-[var(--red-thread)] mb-4">
            Tình yêu với chúng mình là
          </h2>
          <div className="w-24 h-0.5 bg-[var(--red-thread)] mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Groom Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            {/* Polaroid Frame */}
            <div className="relative bg-white p-4 shadow-[0_8px_30px_var(--paper-shadow)] rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
              <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden animate-polaroid film-grain"
              >
                <img
                  src={groomImage}
                  alt={groomName}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Polaroid Caption */}
              <div className="mt-4 font-ephesis text-2xl text-center text-gray-700">
                {groomName}
              </div>

              {/* Red heart sticker */}
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-[var(--red-thread)] rounded-full flex items-center justify-center shadow-lg">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                  <path d="M8 14s-6-4.5-6-8a3 3 0 0 1 6-2 3 3 0 0 1 6 2c0 3.5-6 8-6 8z" />
                </svg>
              </div>
            </div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-8 max-w-sm"
            >
              <div className="relative">
                <svg
                  className="absolute -top-4 -left-4 w-8 h-8 text-[var(--red-thread)] opacity-30"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                </svg>
                <p className="text-center italic text-gray-600 relative z-10 px-6">
                  {groomQuote}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Bride Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            {/* Polaroid Frame */}
            <div className="relative bg-white p-4 shadow-[0_8px_30px_var(--paper-shadow)] rotate-[2deg] hover:rotate-0 transition-transform duration-500">
              <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden animate-polaroid film-grain"
                style={{ animationDelay: '0.3s' }}
              >
                <img
                  src={brideImage}
                  alt={brideName}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Polaroid Caption */}
              <div className="mt-4 font-ephesis text-2xl text-center text-gray-700">
                {brideName}
              </div>

              {/* Red heart sticker */}
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-[var(--red-thread)] rounded-full flex items-center justify-center shadow-lg">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                  <path d="M8 14s-6-4.5-6-8a3 3 0 0 1 6-2 3 3 0 0 1 6 2c0 3.5-6 8-6 8z" />
                </svg>
              </div>
            </div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-8 max-w-sm"
            >
              <div className="relative">
                <svg
                  className="absolute -top-4 -left-4 w-8 h-8 text-[var(--red-thread)] opacity-30"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                </svg>
                <p className="text-center italic text-gray-600 relative z-10 px-6">
                  {brideQuote}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Connecting Heart */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="hidden md:flex justify-center mt-12"
        >
          <div className="w-12 h-12 bg-[var(--red-thread)] rounded-full flex items-center justify-center shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 21s-9-6.75-9-12a4.5 4.5 0 0 1 9-3 4.5 4.5 0 0 1 9 3c0 5.25-9 12-9 12z" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
