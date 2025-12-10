import { motion, AnimatePresence } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GallerySectionProps {
  images: { src: string; date?: string }[];
}

export function GallerySection({ images }: GallerySectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return;

    if (direction === "prev") {
      setSelectedImage(
        selectedImage === 0 ? images.length - 1 : selectedImage - 1
      );
    } else {
      setSelectedImage(
        selectedImage === images.length - 1 ? 0 : selectedImage + 1
      );
    }
  };

  return (
    <section
      ref={ref}
      className="py-24 px-6 md:px-12 bg-[var(--golden-hour)] relative overflow-hidden"
    >
      {/* String Line */}
      {/* <div className="absolute top-32 left-0 right-0 h-0.5 bg-[var(--red-thread)] opacity-20" /> */}

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-ephesis text-5xl md:text-6xl text-[var(--red-thread)] mb-4">
            Khoảnh khắc của chúng mình
          </h2>
          <p className="text-gray-600">Những kỷ niệm đẹp được lưu giữ</p>
          <div className="w-24 h-0.5 bg-[var(--red-thread)] mx-auto mt-6" />
        </motion.div>

        {/* Memory Wall - Photos pinned to string */}
        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotate: 0 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: 0,
                        rotate: index % 3 === 0 ? -2 : index % 3 === 1 ? 2 : -1,
                      }
                    : {}
                }
                transition={{
                  delay: 0.1 * index,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 0,
                  zIndex: 10,
                  transition: { duration: 0.2 },
                }}
                className="relative cursor-pointer group"
                onClick={() => openModal(index)}
              >
                {/* Red Clip */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <svg
                    width="30"
                    height="40"
                    viewBox="0 0 30 40"
                    className="drop-shadow-md"
                  >
                    <rect
                      x="5"
                      y="0"
                      width="20"
                      height="15"
                      rx="2"
                      fill="var(--red-thread)"
                    />
                    <rect
                      x="8"
                      y="8"
                      width="14"
                      height="2"
                      fill="white"
                      opacity="0.3"
                    />
                    <path
                      d="M 10 15 L 10 25 Q 10 30, 15 30 Q 20 30, 20 25 L 20 15"
                      fill="var(--red-thread)"
                    />
                  </svg>
                </div>

                {/* Photo with Polaroid effect */}
                <div className="bg-white p-3 shadow-[0_8px_30px_var(--paper-shadow)] hover:shadow-[0_15px_50px_var(--paper-shadow)] transition-shadow duration-300">
                  <div className="relative aspect-square overflow-hidden film-grain">
                    <img
                      src={image.src}
                      alt={`Memory ${index + 1}`}
                      className="w-full h-full object-cover"
                    />

                    {/* Heart sticker on some photos */}
                    {index % 4 === 0 && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-[var(--red-thread)] rounded-full flex items-center justify-center shadow-md">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="white"
                        >
                          <path d="M6 10.5s-4.5-3.375-4.5-6a2.25 2.25 0 0 1 4.5-1.5 2.25 2.25 0 0 1 4.5 1.5c0 2.625-4.5 6-4.5 6z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Date on border */}
                  {/* {image.date && (
                    <div className="mt-2 font-ephesis text-lg text-center text-gray-600">
                      {image.date}
                    </div>
                  )} */}
                </div>

                {/* Hover indicator */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 rounded pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={closeModal}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            {/* Navigation Buttons */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("prev");
              }}
              className="absolute left-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("next");
              }}
              className="absolute right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring" }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl max-h-[85vh]"
            >
              <img
                src={images[selectedImage].src}
                alt={`Memory ${selectedImage + 1}`}
                className="w-full h-full object-contain rounded-lg shadow-2xl"
              />

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm">
                {selectedImage + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
