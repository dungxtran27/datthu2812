import { motion } from 'motion/react';
import { MapPin, Camera, Heart, Gift } from 'lucide-react';
import { useState } from 'react';

interface FloatingNavProps {
  onRSVPClick: () => void;
  onGiftClick: () => void;
}

export function FloatingNav({ onRSVPClick, onGiftClick }: FloatingNavProps) {
  const [activeSection, setActiveSection] = useState('');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  const navItems = [
    { icon: MapPin, label: 'Địa điểm', action: () => scrollToSection('locations'), section: 'locations' },
    { icon: Camera, label: 'Album', action: () => scrollToSection('gallery'), section: 'gallery' },
    { icon: Heart, label: 'RSVP', action: onRSVPClick, section: 'rsvp' },
    { icon: Gift, label: 'Mừng cưới', action: onGiftClick, section: 'gift' },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg"
      >
        {/* Red Thread Top Border */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-[var(--red-thread)]" />

        <div className="flex items-center justify-around p-2">
          {navItems.map((item, index) => (
            <motion.button
              key={item.label}
              onClick={item.action}
              whileTap={{ scale: 0.9 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5 + index * 0.1, duration: 0.3 }}
              className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-colors ${
                activeSection === item.section
                  ? 'text-[var(--red-thread)]'
                  : 'text-gray-600 hover:text-[var(--red-thread)]'
              }`}
            >
              <div className="relative">
                <item.icon className="w-5 h-5" />
                {/* Active indicator */}
                {activeSection === item.section && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--red-thread)] rounded-full"
                  />
                )}
              </div>
              <span className="text-xs">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.nav>

      {/* Desktop Side Navigation */}
      <motion.nav
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="hidden md:block fixed right-6 top-1/2 -translate-y-1/2 z-30"
      >
        <div className="relative">
          {/* Red Thread Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[var(--red-thread)]/20" />

          <div className="flex flex-col gap-6 relative">
            {navItems.map((item, index) => (
              <motion.button
                key={item.label}
                onClick={item.action}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.5 + index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                className="group relative"
              >
                {/* Charm Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ${
                    activeSection === item.section
                      ? 'bg-[var(--red-thread)] text-white scale-110'
                      : 'bg-white text-gray-600 hover:bg-[var(--red-thread-light)] hover:text-[var(--red-thread)]'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                </div>

                {/* Tooltip */}
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                    {item.label}
                    <div className="absolute left-full top-1/2 -translate-y-1/2">
                      <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-gray-900" />
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>
    </>
  );
}
