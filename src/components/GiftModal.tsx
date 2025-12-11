import { motion, AnimatePresence } from "motion/react";
import { X, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BankAccount {
  bank: string;
  accountNumber: string;
  accountName: string;
  qrCode?: string;
  code: string;
}

export function GiftModal({ isOpen, onClose }: GiftModalProps) {
  // Track which specific account number was copied
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  // Example bank accounts - replace with real data
  const groomAccount: BankAccount = {
    bank: "Ngân hàng TMCP Sài Gòn",
    accountNumber: "030081131429",
    accountName: "BUI TIEN DAT",
    code: "SCB",
  };

  const brideAccount: BankAccount = {
    bank: "Ngân hàng TMCP Quân đội",
    accountNumber: "24960368808000",
    accountName: "NGUYEN THI THU",
    code: "MB",
  };

  const copyToClipboard = (text: string, accountType: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(accountType); // Track which account was copied
    toast.success("Đã sao chép!", {
      description: `Số tài khoản ${
        accountType === "groom" ? "chú rể" : "cô dâu"
      } đã được sao chép`,
      duration: 2000,
    });
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const BankCard = ({
    account,
    title,
    accountType,
  }: {
    account: BankAccount;
    title: string;
    accountType: "groom" | "bride";
  }) => (
    <div className="relative">
      {/* Red Envelope Design */}
      <div className="bg-gradient-to-br from-red-600 to-[var(--red-thread)] rounded-lg p-6 shadow-2xl overflow-hidden relative">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id={`envelope-pattern-${accountType}`}
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="20" cy="20" r="1" fill="white" />
                <circle cx="0" cy="0" r="1" fill="white" />
                <circle cx="40" cy="0" r="1" fill="white" />
                <circle cx="0" cy="40" r="1" fill="white" />
                <circle cx="40" cy="40" r="1" fill="white" />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill={`url(#envelope-pattern-${accountType})`}
            />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="text-center mb-4">
            <h4 className="font-ephesis text-3xl text-white mb-1">{title}</h4>
            <div className="w-16 h-0.5 bg-white/50 mx-auto" />
          </div>

          <div className="bg-white/95 rounded-lg p-4 space-y-3">
            {/* Bank Name */}
            <div className="text-center pb-3 border-b border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Ngân hàng</p>
              <p className="text-gray-800">{account.bank}</p>
            </div>

            {/* Account Name */}
            <div>
              <p className="text-xs text-gray-500 mb-1">Chủ tài khoản</p>
              <p className="text-gray-800">{account.accountName}</p>
            </div>

            {/* Account Number with Copy */}
            <div>
              <p className="text-xs text-gray-500 mb-1">Số tài khoản</p>
              <div className="flex items-center gap-2">
                <p className="flex-1 text-gray-800 tracking-wider">
                  {account.accountNumber}
                </p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    copyToClipboard(account.accountNumber, accountType)
                  }
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                  aria-label={`Sao chép số tài khoản ${title}`}
                >
                  {copiedAccount === accountType ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-600" />
                  )}
                </motion.button>
              </div>
            </div>

            {/* QR Code Placeholder */}
            <div className="pt-3 border-t border-gray-200">
              <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-40">
                <div className="text-center text-gray-500">
                  <img
                    src={`https://img.vietqr.io/image/${account.code}-${account.accountNumber}-compact.png`}
                    alt={`QR Code tài khoản ${title}`}
                    className="max-h-full max-w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="relative bg-[var(--golden-hour)] p-6 border-b border-gray-200">
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 w-8 h-8 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors shadow-md"
                  aria-label="Đóng"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </motion.button>

                <div className="text-center">
                  <h3 className="font-ephesis text-5xl text-[var(--red-thread)] mb-2">
                    Gửi mừng cưới
                  </h3>
                  <p className="text-gray-600">
                    Tình cảm của bạn là món quà quý giá nhất với chúng mình
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor:
                            i === 2 ? "var(--red-thread)" : "#e5e7eb",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <BankCard
                    account={groomAccount}
                    title="Chú rể"
                    accountType="groom"
                  />
                  <BankCard
                    account={brideAccount}
                    title="Cô dâu"
                    accountType="bride"
                  />
                </div>

                {/* Note */}
                <div className="mt-6 p-4 bg-[var(--red-thread-light)] rounded-lg border border-[var(--red-thread)]/20">
                  <p className="text-sm text-gray-700 text-center italic">
                    Sự hiện diện của bạn là món quà ý nghĩa nhất. Nếu bạn muốn
                    gửi tặng thêm, đây là thông tin tài khoản của chúng mình.
                    Xin chân thành cảm ơn! ❤️
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
//ll