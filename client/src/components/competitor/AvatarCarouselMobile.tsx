import React, { useState, useEffect } from "react";

interface AvatarCarouselMobileProps {
  imageUrls: { url: string }[];
}

const AvatarCarouselMobile: React.FC<AvatarCarouselMobileProps> = ({
  imageUrls,
}) => {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [startX, setStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const totalImages = imageUrls.length;

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || startX === null) return;
    const touchEndX = e.touches[0].clientX;
    const diff = startX - touchEndX;

    if (diff > 25) {
      handleNav(1);
      setStartX(null);
      setIsDragging(false);
    } else if (diff < -25) {
      handleNav(-1);
      setStartX(null);
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setStartX(null);
  };

  const handleNav = (direction: number) => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + direction + totalImages) % totalImages
    );
  };

  const getImageClass = (index: number) => {
    const offset = Math.abs(index - currentIndex);
    if (offset === 0) return "w-[125px] h-[130px]"; // Image centrale
    if (offset === 1) return "w-[90px] h-[110px]"; // Images adjacentes
    return "hidden"; // Cacher les images qui ne sont pas adjacentes
  };

  return (
    <>
      <section aria-labelledby="title-avatar">
        <p id="title-avatar">Choisi ton avatar</p>
        <div
          className="flex h-44 w-full items-center justify-center overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
            {imageUrls.map((url, index) => {
              const offset = Math.abs(index - currentIndex);
              const zIndex = index === currentIndex ? 10 : offset === 1 ? 5 : 0;
              const leftPosition = windowWidth > 500 ? "40%" : "33%";
              return (
                <figure
                  key={index}
                  className={`transition-transform duration-300 ease-in-out ${getImageClass(index)}`}
                  style={{
                    transform: `translateX(${(index - currentIndex) * 100 + (index > currentIndex ? +30 : 0) + (index < currentIndex ? +8 : 0)}%)`,
                    position: "absolute",
                    left: leftPosition,
                    top: index === currentIndex ? "10%" : "11%",
                    marginTop: index === currentIndex ? "-10px" : "0",
                    marginBottom: index === currentIndex ? "-10px" : "0",
                    zIndex: zIndex,
                  }}
                >
                  <img
                    src={url.url}
                    alt={`Avatar ${index + 1}`}
                    className="h-full w-full rounded-lg object-cover"
                  />
                  <figcaption className="sr-only">{`Avatar ${index + 1}`}</figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default AvatarCarouselMobile;
