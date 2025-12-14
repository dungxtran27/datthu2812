import { useState } from "react";
import { Toaster } from "./components/ui/sonner";
import { HeroSection } from "./components/HeroSection";
import { CoupleSection } from "./components/CoupleSection";
import { LocationSection } from "./components/LocationSection";
import { GallerySection } from "./components/GallerySection";
import { RSVPModal } from "./components/RSVPModal";
import { GiftModal } from "./components/GiftModal";
import { MusicControl } from "./components/MusicControl";
import { FloatingNav } from "./components/FloatingNav";
import { Footer } from "./components/Footer";
import { MessagesSection } from "./components/MessagesSection";
import { useSheetData } from "./hooks/useSheetData";

interface SheetData {
  timestamp: string;
  name: string;
  attending: string;
  guests: number;
  message: string;
}

interface Message {
  username: string;
  message: string;
}

interface SheetResponse {
  result: string;
  data: SheetData[];
  count: number;
  lastUpdated: string;
}
const WEDDING_DATA = {
  groom: {
    name: "Đạt",
    fullName: "Tiến Đạt",
    image:
      "https://res.cloudinary.com/dqxtjesjz/image/upload/v1765386979/groom_g5ygub.jpg",
    quote: "Tình yêu không phải là nhìn nhau, mà là cùng nhìn về một hướng.",
  },
  bride: {
    name: "Thư",
    fullName: "Nguyễn Thư",
    image:
      "https://res.cloudinary.com/dqxtjesjz/image/upload/v1765386979/bride_fxz48s.jpg",
    quote: "Yêu là biết trân trọng từng khoảnh khắc bên nhau.",
  },
  heroImage:
    "https://res.cloudinary.com/dqxtjesjz/image/upload/v1765552687/h2_wdbp2q.jpg",
  locations: {
    groom: {
      title: "Tiệc Cưới Nhà Trai",
      subtitle: "Tại Gia Đình Nhà Trai",
      address:
        "Số 16 lô 3, Phố Trung Nghĩa-KĐT Việt Hoà, Phường Việt Hoà, Thành phố Hải Phòng",
      time: " 9:30",
      date: "28/12/2025",
      mapUrl: "https://maps.app.goo.gl/ZpPwKGahU8U4xB338",
    },
    bride: {
      title: "Tiệc Cưới Nhà Gái",
      subtitle: "Tại Gia Đình Nhà Gái",
      address: "Thôn Phượng Hoàng- xã Cẩm Giang- Thành phố Hải Phòng",
      time: "8:00",
      date: "28/12/2025",
      mapUrl: "https://maps.app.goo.gl/GBjVxVin4P3CD4K2A",
    },
  },
  gallery: [
    {
      src: "https://res.cloudinary.com/dqxtjesjz/image/upload/v1765551289/album_030523_egz2t4.jpg",
      date: "03/05/2023",
    },
    {
      src: "https://res.cloudinary.com/dqxtjesjz/image/upload/v1765551288/220923_ges7qs.jpg",
      date: "22/09/2023",
    },
    {
      src: "https://res.cloudinary.com/dqxtjesjz/image/upload/v1765551285/071223_nlhsin.jpg",
      date: "07/12/2023",
    },
    {
      src: "https://res.cloudinary.com/dqxtjesjz/image/upload/v1765551288/album_090224_brc0cm.jpg",
      date: "09/02/2024",
    },
    {
      src: "https://res.cloudinary.com/dqxtjesjz/image/upload/v1765551285/080324_opew6r.jpg",
      date: "08/03/2024",
    },
    {
      src: "https://res.cloudinary.com/dqxtjesjz/image/upload/v1765551286/190524_f6zfpt.jpg",
      date: "19/05/2024",
    },
    {
      src: "https://res.cloudinary.com/dqxtjesjz/image/upload/v1765551287/290724_pz5wxo.jpg",
      date: "29/07/2024",
    },
    {
      src: "https://res.cloudinary.com/dqxtjesjz/image/upload/v1765551287/280125_svac2i.jpg",
      date: "29/01/2025",
    },
    {
      src: "https://res.cloudinary.com/dqxtjesjz/image/upload/v1765552790/300125_iidi5o.jpg",
      date: "30/01/2025",
    },
    {
      src: "https://res.cloudinary.com/dqxtjesjz/image/upload/v1765551286/1401525_fqnqkt.jpg",
      date: "14/05/2025",
    },

    {
      src: "https://res.cloudinary.com/dqxtjesjz/image/upload/v1765551286/280925_anzywa.jpg",
      date: "28/09/2025",
    },
    {
      src: "https://res.cloudinary.com/dqxtjesjz/image/upload/v1765551288/281225_nfljks.jpg",
      date: "28/12/2025",
    },
  ],
};
export default function App() {
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const { data: sheetData, loading, error, refresh } = useSheetData();
  const transformMessages = (data: SheetData[]): Message[] => {
    if (!data || data.length === 0) return [];

    return data
      .filter((item) => {
        // Filter out items with very short or empty messages
        const trimmedMessage = item.message?.trim() || "";
        return (
          trimmedMessage.length > 3 &&
          !["oke", "ok", "yes", "no"].includes(trimmedMessage.toLowerCase())
        );
      })
      .map((item) => ({
        username: item.name,
        message: item.message
          .trim()
          .replace(/\n+/g, " ") // Replace multiple newlines with space
          .replace(/\s+/g, " "), // Normalize whitespace
      }))
      .filter((item, index, self) => {
        // Remove duplicates based on username and similar messages
        const isDuplicate =
          self.findIndex(
            (t) =>
              t.username === item.username &&
              t.message.substring(0, 20) === item.message.substring(0, 20)
          ) !== index;
        return !isDuplicate;
      });
  };

  const defaultMessages: Message[] = [
    {
      username: "Chị Mai",
      message: "Chúc hai em trăm năm hạnh phúc, bên nhau suốt đời!",
    },
    { username: "Anh Tuấn", message: "Hạnh phúc mãi mãi nhé hai đứa!" },
    {
      username: "Cô Lan",
      message: "Con gái cô đẹp lắm, chúc cháu nhiều niềm vui",
    },
    {
      username: "Bác Hùng",
      message: "Chúc mừng hai cháu, sớm có tin vui nha",
    },
    {
      username: "Em Trang",
      message: "Chị Linh đẹp quá! Chúc hai anh chị hạnh phúc nha ❤️",
    },
    {
      username: "Thầy Nam",
      message: "Chúc học trò cưng của thầy luôn vui vẻ, hạnh phúc",
    },
    {
      username: "Hoa",
      message: "Mãi yêu nha cả nhà, chúc mừng Minh & Linh!",
    },
    { username: "Bạn Duy", message: "Ước gì đám cưới mình sẽ đẹp như vậy!" },
    {
      username: "Chú Phong",
      message: "Chúc hai cháu hạnh phúc, sum vầy bên nhau",
    },
    {
      username: "Mẹ Nga",
      message: "Con yêu, mẹ yêu con rất nhiều. Hạnh phúc nhé!",
    },
    { username: "Anh Khoa", message: "Tuyệt vời, chúc mừng anh em nha!" },
    { username: "Bé An", message: "Cô dâu đẹp như công chúa ạ!" },
    {
      username: "Bác Thảo",
      message: "Trăm năm hạnh phúc, bách niên giai lão",
    },
    {
      username: "Chị Hằng",
      message: "Yêu lắm hai em, chúc hai em hạnh phúc đến già",
    },
    { username: "Thanh", message: "Đời đời bên nhau nhé các bạn!" },
    {
      username: "Mến",
      message: "Cảm ơn vì đã cho mình thấy tình yêu đích thực",
    },
    {
      username: "Ông Nội",
      message: "Ông chúc hai đứa cháu sống trọn đời bên nhau",
    },
    {
      username: "Quỳnh",
      message: "Xinh đẹp quá chị ơi! Chúc mừng hạnh phúc!",
    },
    {
      username: "Phương",
      message: "Chúc hai bạn luôn yêu nhau như ngày hôm nay",
    },
    {
      username: "Thúy",
      message: "Tình yêu của các bạn thật đẹp, giữ mãi nhé!",
    },
  ];

  const messages =
    sheetData?.length > 0 ? transformMessages(sheetData) : defaultMessages;

  // Handle RSVP submission success - refresh data
  const handleRSVPSuccess = () => {
    // Close modal
    setIsRSVPOpen(false);

    // Refresh data after a short delay to allow Google Sheets to update
    setTimeout(() => {
      refresh();
    }, 2000);
  };

  // Combined wedding data with dynamic messages
  const weddingData = {
    ...WEDDING_DATA,
    messages,
  };
  return (
    <div className="min-h-screen bg-[var(--silk-white)]">
      {/* Hero Section */}
      <HeroSection
        heroImage={weddingData.heroImage}
        groomName={weddingData.groom.fullName}
        brideName={weddingData.bride.fullName}
      />
      {/* Couple Section */}
      <CoupleSection
        groomImage={weddingData.groom.image}
        brideImage={weddingData.bride.image}
        groomName={weddingData.groom.fullName}
        brideName={weddingData.bride.fullName}
        groomQuote={weddingData.groom.quote}
        brideQuote={weddingData.bride.quote}
      />
      {/* Location Section */}
      <div id="locations">
        <LocationSection
          groomLocation={weddingData.locations.groom}
          brideLocation={weddingData.locations.bride}
        />
      </div>
      {/* Gallery Section */}
      <div id="gallery">
        <GallerySection images={weddingData.gallery} />
      </div>
      {/* Guest Section */}
      <div id="guest">
        <MessagesSection messages={weddingData.messages} isLoading={loading} />{" "}
      </div>
      {/* Footer */}
      <Footer
        groomName={weddingData.groom.fullName}
        brideName={weddingData.bride.fullName}
      />
      {/* Modals */}
      <RSVPModal
        isOpen={isRSVPOpen}
        onClose={() => setIsRSVPOpen(false)}
        onSuccess={handleRSVPSuccess}
      />{" "}
      <GiftModal isOpen={isGiftOpen} onClose={() => setIsGiftOpen(false)} />
      {/* Floating Navigation */}
      <FloatingNav
        onRSVPClick={() => setIsRSVPOpen(true)}
        onGiftClick={() => setIsGiftOpen(true)}
      />
      {/* Music Control */}
      <MusicControl />
      {/* Toast Notifications */}
      <Toaster position="top-center" richColors />
    </div>
  );
}
