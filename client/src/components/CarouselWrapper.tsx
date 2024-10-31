import { useState, useEffect } from "react";
import AvatarCarouselDesktop from "./competitor/AvatarCarouselDesktop";
import AvatarCarouselMobile from "./competitor/AvatarCarouselMobile";

interface CarouselWrapperProps {
  imageUrls: { url: string }[];
}
const AvatarCarouselWrapper = ({ imageUrls }: CarouselWrapperProps) => {
  const [isMobile, setIsMobile] = useState(false);
  // const [currentIndex, setCurrentIndex] = useState(3);
  // const [startX, setStartX] = useState<number | null>(null);
  // const [isDragging, setIsDragging] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <AvatarCarouselMobile imageUrls={imageUrls} />
      ) : (
        <AvatarCarouselDesktop imageUrls={imageUrls} />
      )}
    </>
  );
};

export default AvatarCarouselWrapper;
