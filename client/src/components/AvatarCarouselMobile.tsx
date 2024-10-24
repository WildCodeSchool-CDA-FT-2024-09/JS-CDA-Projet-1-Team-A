import React, { useState, useEffect } from "react";

// Exemple de mock de données d'API avec des URLs d'images temporaires
const imageUrls = [
  "/freepik-apollon1.png",
  "/freepik-artemis1.png",
  "/freepik-dionysos1.png",
  "/freepik-gracefully1.png",
  "/freepik-zeus1.png",
  "/freepik-apollon1.png",
  "/freepik-artemis1.png",
  "/freepik-dionysos1.png",
  "/freepik-gracefully1.png",
  "/freepik-zeus1.png",
];

const AvatarCarouselMobile: React.FC = () => {
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
      nextImage();
      setStartX(null);
      setIsDragging(false);
    } else if (diff < -25) {
      prevImage();
      setStartX(null);
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setStartX(null);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
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
      <div>Choisi ton avatar</div>
      <div
        className="flex h-96 w-full items-center justify-center overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
          {imageUrls.map((url, index) => {
            const offset = Math.abs(index - currentIndex);
            const zIndex = index === currentIndex ? 10 : offset === 1 ? 5 : 0; // Gestion du z-index
            const leftPosition = windowWidth > 500 ? "40%" : "33%";
            return (
              <div
                key={index}
                className={`transition-transform duration-300 ease-in-out ${getImageClass(index)}`}
                style={{
                  transform: `translateX(${(index - currentIndex) * 100 + (index > currentIndex ? +30 : 0) + (index < currentIndex ? +8 : 0)}%)`, // Ajustement de la position des images adjacentes
                  position: "absolute",
                  left: leftPosition,
                  top: index === currentIndex ? "10%" : "11%", // Ajustement de la position top
                  marginTop: index === currentIndex ? "-10px" : "0",
                  marginBottom: index === currentIndex ? "-10px" : "0",
                  zIndex: zIndex,
                }}
              >
                <img
                  src={url}
                  alt={`Image ${index + 1}`}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AvatarCarouselMobile;
