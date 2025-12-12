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

export default function App() {
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);
  const [isGiftOpen, setIsGiftOpen] = useState(false);

  // Wedding data - customize these values
  const weddingData = {
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
      "https://res.cloudinary.com/dqxtjesjz/image/upload/v1765386979/hero_gtgfrp.jpg",
    locations: {
      groom: {
        title: "Tiệc Cưới Nhà Trai",
        subtitle: "Tại Gia Đình Nhà Trai",
        address:
          "Số 16 lô 3, Phố Trung Nghĩa-KĐT Việt Hoà, Phường Việt Hoà, Thành phố Hải Phòng",
        time: "14:30",
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
        src: "../asset/album_030523.jpg",
        date: "03/05/2023",
      },
      {
        src: "../asset/220923.jpg",
        date: "22/09/2023",
      },
      {
        src: "../asset/071223.jpg",
        date: "07/12/2023",
      },
      {
        src: "../asset/album_090224.jpg",
        date: "09/02/2024",
      },
      {
        src: "../asset/080324.jpg",
        date: "08/03/2024",
      },
      {
        src: "../asset/190524.jpg",
        date: "19/05/2024",
      },
      {
        src: "../asset/290724.jpg",
        date: "29/07/2024",
      },
      {
        src: "../asset/280125.jpg",
        date: "28/01/2025",
      },
      {
        src: "../asset/1401525.jpg",
        date: "14/05/2025",
      },

      {
        src: "../asset/280925.jpg",
        date: "28/09/2025",
      },
      {
        src: "../asset/281225.jpg",
        date: "28/12/2025",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--silk-white)]">
      {/* Hero Section */}
      <HeroSection
        heroImage={weddingData.heroImage}
        groomName={weddingData.groom.name}
        brideName={weddingData.bride.name}
      />

      {/* Couple Section */}
      <CoupleSection
        groomImage={weddingData.groom.image}
        brideImage={weddingData.bride.image}
        groomName={weddingData.groom.name}
        brideName={weddingData.bride.name}
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

      {/* Footer */}
      <Footer
        groomName={weddingData.groom.name}
        brideName={weddingData.bride.name}
      />

      {/* Modals */}
      <RSVPModal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} />
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
