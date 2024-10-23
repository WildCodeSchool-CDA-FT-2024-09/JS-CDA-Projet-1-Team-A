import React, { useState } from "react";

// Exemple de mock de données d'API avec des URLs d'images temporaires
const imageUrls = [
  "/freepik-apollon1.png",
  "/freepik-artemis1.png",
  "/freepik-dionysos1.png",
  "/freepik-gracefully1.png",
  "/freepik-zeus1.png",
];

const AvatarCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const totalImages = imageUrls.length;

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
    const diff = startX - touchEndX;

    if (diff > 50) {
      nextImage();
      setStartX(null);
      setIsDragging(false);
    } else if (diff < -50) {
      prevImage();
      setStartX(null);
      setIsDragging(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || startX === null) return;

    const mouseEndX = e.clientX;
    const diff = startX - mouseEndX;

    if (diff > 50) {
      nextImage();
      setStartX(null);
      setIsDragging(false);
    } else if (diff < -50) {
      prevImage();
      setStartX(null);
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setStartX(null);
  };

  const handleMouseUp = () => {
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
    if (offset === 0) return "w-[300px] h-[395px]"; // Image centrale
    return "w-[210px] h-[250px] opacity-75"; // Images adjacentes
  };

  return (
    <div
      className="flex h-96 w-full items-center justify-center overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={isDragging ? handleMouseMove : undefined}
      onMouseUp={handleMouseUp}
    >
      <div className="relative flex h-[700px] w-full items-center justify-center overflow-hidden">
        {imageUrls.map((url, index) => (
          <div
            key={index}
            className={`transition-transform duration-300 ease-in-out ${getImageClass(index)} ${
              index === currentIndex ? "z-10" : "z-0"
            }`}
            style={{
              transform: `translateX(${(index - currentIndex) * 100 + (index > currentIndex ? +25 : 0) + (index < currentIndex ? +25 : 0)}%)`,
              position: "absolute",
              left: "35%",
              top: index === currentIndex ? "30%" : "35%", // Ajustement de la position de l'image centrale
              transformOrigin: "center center",
              marginTop: index === currentIndex ? "-40px" : "0", // Augmente le débordement en haut pour l'image centrale
              marginBottom: index === currentIndex ? "-20px" : "0", // Débordement en bas pour l'image centrale
              width: index === currentIndex ? "300px" : "210px", // Largeur
              height: index === currentIndex ? "395px" : "270px", // Hauteur
            }}
          >
            <img
              src={url}
              alt={`Image ${index + 1}`}
              className="h-full w-full rounded-lg object-cover" // Ajustement à la div
              style={{
                maxHeight: index === currentIndex ? "395px" : "270px", // Hauteur maximale
                maxWidth: index === currentIndex ? "300px" : "210px", // Largeur maximale
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarCarousel;
