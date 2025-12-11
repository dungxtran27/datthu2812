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
        src: "https://res.cloudinary.com/dqxtjesjz/image/upload/v1765386977/album1_issvmy.jpg",
        date: "01/2023",
      },
      {
        src: "https://res.cloudinary.com/dqxtjesjz/image/upload/v1765386978/album2_eetkki.jpg",
        date: "03/2023",
      },
      {
        src: "https://res.cloudinary.com/dqxtjesjz/image/upload/v1765386978/album3_akvbr3.jpg",
      },
      {
        src: "https://res.cloudinary.com/dqxtjesjz/image/upload/v1765386978/album4_cj0q3i.jpg",
        date: "05/2023",
      },
      {
        src: "https://res.cloudinary.com/dqxtjesjz/image/upload/v1765386978/album5_d4l8o5.jpg",
      },
      {
        src: "https://res.cloudinary.com/dqxtjesjz/image/upload/v1765386978/album6_yngels.jpg",
        date: "07/2023",
      },
      {
        src: "https://res.cloudinary.com/dqxtjesjz/image/upload/v1765386978/album7_xv5tco.jpg",
      },
      {
        src: "https://res.cloudinary.com/dqxtjesjz/image/upload/v1765386979/album8_qunna5.jpg",
        date: "08/2023",
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
