import { useState, useEffect } from "react";
import AvatarCarousel from "./competitor/AvatarCarousel";

interface AvatarCarouselWrapperProps {
  imageUrls: string[];
  myTitle: string;
}

const AvatarCarouselWrapper = ({
  imageUrls,
  myTitle,
}: AvatarCarouselWrapperProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(3);
  const [startX, setStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const totalImages = imageUrls.length;

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDragMove = (diff: number) => {
    const numberPx = isMobile ? 25 : 50;

    if (diff > numberPx) {
      handleNav(1);
      resetDrag();
    } else if (diff < -numberPx) {
      handleNav(-1);
      resetDrag();
    }
  };

  const resetDrag = () => {
    setStartX(null);
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || startX === null) return;
    const touchEndX = e.touches[0].clientX;
    handleDragMove(startX - touchEndX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || startX === null) return;
    const mouseEndX = e.clientX;
    handleDragMove(startX - mouseEndX);
  };

  const handleNav = (direction: number) => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + direction + totalImages) % totalImages
    );
  };

  return (
    <>
      <AvatarCarousel
        imageUrls={imageUrls}
        myTitle={myTitle}
        handleTouchStart={handleTouchStart}
        handleTouchMove={handleTouchMove}
        handleTouchEnd={resetDrag}
        handleMouseDown={handleMouseDown}
        isDragging={isDragging}
        handleMouseMove={handleMouseMove}
        handleMouseUp={resetDrag}
        currentIndex={currentIndex}
        mobile={isMobile}
      />
    </>
  );
};

export default AvatarCarouselWrapper;
