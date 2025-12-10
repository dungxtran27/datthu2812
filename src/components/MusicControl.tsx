import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Music from "../asset/music.mp3";

export function MusicControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      // Try to play automatically on user interaction (browser policy)
      const handleUserInteraction = () => {
        if (isPlaying) {
          const playPromise = audioRef.current?.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.log("Autoplay prevented:", error);
              // User interaction needed, don't auto-play
            });
          }
        }
      };

      // Add event listeners for user interaction
      window.addEventListener("click", handleUserInteraction);
      window.addEventListener("touchstart", handleUserInteraction);

      return () => {
        window.removeEventListener("click", handleUserInteraction);
        window.removeEventListener("touchstart", handleUserInteraction);
      };
    }
  }, [isPlaying]);

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Playback failed:", error);
            setIsPlaying(false);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const toggleMusic = () => {
    // Important: Toggle state first
    const newPlayingState = !isPlaying;
    setIsPlaying(newPlayingState);

    // If we're trying to play, ensure we have user interaction
    if (newPlayingState && audioRef.current) {
      // Set volume to a reasonable level
      audioRef.current.volume = 0.6;

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Playback prevented:", error);
          // If autoplay is prevented, don't show as playing
          setIsPlaying(false);
        });
      }
    }

    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  // Optional: Add fade in/out effect for better UX
  const fadeAudio = (fadeType: "in" | "out") => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    const fadeTime = 1000; // 1 second fade
    const interval = 50;
    const steps = fadeTime / interval;
    const changePerStep = audio.volume / steps;

    if (fadeType === "out") {
      let currentVolume = audio.volume;
      const fadeInterval = setInterval(() => {
        if (currentVolume > changePerStep) {
          currentVolume -= changePerStep;
          audio.volume = currentVolume;
        } else {
          audio.pause();
          audio.volume = 0.6; // Reset volume for next play
          clearInterval(fadeInterval);
        }
      }, interval);
    } else {
      audio.volume = 0;
      audio.play();
      let currentVolume = 0;
      const fadeInterval = setInterval(() => {
        if (currentVolume < 0.6) {
          currentVolume += changePerStep;
          audio.volume = currentVolume;
        } else {
          clearInterval(fadeInterval);
        }
      }, interval);
    }
  };

  return (
    <>
      {/* Hidden audio element with your music file */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src={Music} // Using your imported music file
      />

      {/* Music Control Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-30"
      >
        <motion.button
          onClick={toggleMusic}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onHoverStart={() => setShowTooltip(true)}
          onHoverEnd={() => setShowTooltip(false)}
          className="relative w-14 h-14 bg-[var(--red-thread)] hover:bg-red-700 rounded-full shadow-lg flex items-center justify-center text-white transition-colors group"
        >
          {/* Breathing animation when playing */}
          <AnimatePresence>
            {isPlaying && (
              <>
                <motion.div
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  exit={{ scale: 1, opacity: 0.5 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute inset-0 bg-[var(--red-thread)] rounded-full"
                />
                <motion.div
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  exit={{ scale: 1, opacity: 0.5 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.5,
                  }}
                  className="absolute inset-0 bg-[var(--red-thread)] rounded-full"
                />
              </>
            )}
          </AnimatePresence>

          {/* Icon */}
          <div className="relative z-10">
            {isPlaying ? (
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </motion.div>
            ) : (
              <VolumeX className="w-6 h-6" />
            )}
          </div>

          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-full mr-3 whitespace-nowrap bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg"
              >
                {isPlaying ? "Tắt nhạc" : "Bật nhạc"}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                  <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-gray-900" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </>
  );
}
