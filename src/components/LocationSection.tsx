import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { MapPin, Clock } from "lucide-react";

interface Location {
  title: string;
  subtitle: string;
  address: string;
  time: string;
  date: string;
  mapUrl: string;
}

interface LocationSectionProps {
  groomLocation: Location;
  brideLocation: Location;
}

export function LocationSection({
  groomLocation,
  brideLocation,
}: LocationSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const LocationCard = ({
    location,
    delay,
  }: {
    location: Location;
    delay: number;
  }) => {

    return (
      <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ y: -5 }}
      transition={{ delay, duration: 0.8 }}
      className="relative"
      >
        {/* Ticket/Card */}
        <div className="relative bg-white rounded-lg shadow-[0_10px_40px_var(--paper-shadow)] overflow-hidden paper-texture">
          {/* Decorative Border */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[var(--red-thread)] via-red-400 to-[var(--red-thread)]" />

          <div className="p-8 md:p-10">
            {/* Title in Ephesis */}
            <h3 className="font-ephesis text-4xl md:text-5xl text-[var(--red-thread)] mb-2 text-center">
              {location.title}
            </h3>

            {/* Subtitle */}
            <p className="text-center text-gray-600 mb-6">
              {location.subtitle}
            </p>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
              <div className="w-2 h-2 bg-[var(--red-thread)] rounded-full" />
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            </div>

            {/* Address */}
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="w-5 h-5 text-[var(--red-thread)] flex-shrink-0 mt-1" />
              <p className="text-gray-700 flex-1">{location.address}</p>
            </div>

            {/* Time */}
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-5 h-5 text-[var(--red-thread)] flex-shrink-0" />
              <p className="text-gray-700">
                <span className="font-medium">{location.time}</span>
                <span className="mx-2">|</span>
                <span>{location.date}</span>
              </p>
            </div>

            {/* Wax Seal Button */}
            <div className="flex justify-center">
              <motion.a
                href={location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex px-3 py-3 bg-[var(--red-thread)] text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
              >
                <p className="mx-2"> Xem bản đồ</p>
                <MapPin />
              </motion.a>
            </div>
          </div>

          {/* Ticket Perforations */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
            <div className="w-4 h-4 bg-[var(--golden-hour)] rounded-full" />
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
            <div className="w-4 h-4 bg-[var(--golden-hour)] rounded-full" />
          </div>
        </div>

      
        <motion.div
          animate={{
            y: hoveredCard === location.title ? -5 : 0,
            opacity: hoveredCard === location.title ? 0.3 : 0.15,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gray-400 rounded-lg -z-10 blur-sm"
          style={{ transform: "translateY(8px)" }}
        />
      </motion.div>
    );
  };

  return (
    <section
      ref={ref}
      className="py-24 px-6 md:px-12 bg-[var(--silk-white)] relative"
    >
      {/* Decorative Thread */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--red-thread)] to-transparent opacity-30" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-ephesis text-5xl md:text-6xl text-[var(--red-thread)] mb-4">
            Thông tin tiệc cưới
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chúng mình rất vui được đón tiếp quý khách tại hai buổi tiệc
          </p>
          <div className="w-24 h-0.5 bg-[var(--red-thread)] mx-auto mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          <LocationCard location={groomLocation} delay={0.3} />
          <LocationCard location={brideLocation} delay={0.5} />
        </div>

      </div>
    </section>
  );
}
