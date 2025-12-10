import { motion, AnimatePresence } from "motion/react";
import { X, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RSVPModal({ isOpen, onClose }: RSVPModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    guests: "1",
    attending: "yes",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Show loading toast
    const loadingToast = toast.loading("Đang gửi xác nhận...");
    try {
      // Replace with your actual Web App URL from Step 2
      const WEB_APP_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

      const response = await fetch(WEB_APP_URL, {
        method: "POST",
        mode: "no-cors", // Important for Google Apps Script
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Note: With 'no-cors' mode, we can't read the response
      // But the data should still be sent to Google Sheets

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Show success message
      toast.success(
        <div className="font-ephesis text-xl">Cảm ơn {formData.name}! ❤️</div>,
        {
          description: "Chúng mình rất mong được gặp bạn",
          duration: 4000,
        }
      );

      // Reset form and close modal
      setFormData({ name: "", guests: "1", attending: "yes", message: "" });
      onClose();
    } catch (error) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Show error message
      toast.error("Có lỗi xảy ra", {
        description:
          "Vui lòng thử lại sau hoặc liên hệ trực tiếp với chúng mình.",
        duration: 4000,
      });
      console.error("Submission error:", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
          >
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto paper-texture">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-[var(--red-thread)] to-red-600 p-6 text-white">
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>

                <h3 className="font-ephesis text-4xl mb-2">Xác nhận tham dự</h3>
                <p className="text-white/90 text-sm">
                  Vui lòng cho chúng mình biết bạn có thể đến không nhé
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-gray-700 mb-2">
                    Họ và tên{" "}
                    <span className="text-[var(--red-thread)]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    placeholder="Nhập tên của bạn"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--red-thread)] focus:border-transparent transition-all"
                  />
                </div>

                {/* Attending */}
                <div>
                  <label className="block text-gray-700 mb-2">
                    Bạn có thể tham dự không?{" "}
                    <span className="text-[var(--red-thread)]">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setFormData({ ...formData, attending: "yes" })
                      }
                      className={`py-3 px-4 rounded-lg border-2 transition-all ${
                        formData.attending === "yes"
                          ? "border-[var(--red-thread)] bg-[var(--red-thread-light)] text-[var(--red-thread)]"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      ✓ Có, mình sẽ đến
                    </motion.button>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setFormData({ ...formData, attending: "no" })
                      }
                      className={`py-3 px-4 rounded-lg border-2 transition-all ${
                        formData.attending === "no"
                          ? "border-[var(--red-thread)] bg-[var(--red-thread-light)] text-[var(--red-thread)]"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      ✗ Không thể đến
                    </motion.button>
                  </div>
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="block text-gray-700 mb-2">
                    Số lượng khách{" "}
                    <span className="text-[var(--red-thread)]">*</span>
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({ ...formData, guests: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--red-thread)] focus:border-transparent transition-all"
                  >
                    <option value="1">1 người</option>
                    <option value="2">2 người</option>
                    <option value="3">3 người</option>
                    <option value="4">4 người</option>
                    <option value="5+">5+ người</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-700 mb-2">
                    Lời chúc (Tùy chọn)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Gửi lời chúc tới chúng mình..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--red-thread)] focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[var(--red-thread)] to-red-600 text-white py-4 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Gửi xác nhận</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </form>

              {/* Decorative Bottom */}
              <div className="px-6 pb-6">
                <div className="flex items-center justify-center gap-2">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor:
                          i === 3 ? "var(--red-thread)" : "#e5e7eb",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
