import React, { useState } from "react";

interface AvatarCarouselDesktopProps {
  imageUrls: { url: string }[];
}
const AvatarCarouselDesktop: React.FC<AvatarCarouselDesktopProps> = ({
  imageUrls,
}) => {
  const [currentIndex, setCurrentIndex] = useState(3);
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
      handleNav(1);
      setStartX(null);
      setIsDragging(false);
    } else if (diff < -50) {
      handleNav(-1);
      setStartX(null);
      setIsDragging(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || startX === null) return;
    const mouseEndX = e.clientX;
    const diff = startX - mouseEndX;

    if (diff > 50) {
      handleNav(1);
      setStartX(null);
      setIsDragging(false);
    } else if (diff < -50) {
      handleNav(-1);
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

  const handleNav = (direction: number) => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + direction + totalImages) % totalImages
    );
  };

  const getImageClass = (index: number) => {
    const offset = Math.abs(index - currentIndex);
    if (offset === 0) return "w-[300px] h-[395px]"; // Image centrale
    if (offset === 1) return "w-[210px] h-[250px]"; // Images adjacentes
    if (offset === 2) return "w-[190px] h-[210px]"; // Images adjacentes +1
    return "hidden";
  };

  return (
    <>
      <section aria-labelledby="title-avatar">
        <p id="title-avatar">Choisis ton avatar</p>
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
            {imageUrls.map((url, index) => {
              const offset = Math.abs(index - currentIndex);
              const zIndex = index === currentIndex ? 10 : offset === 1 ? 5 : 0;

              return (
                <figure
                  key={index}
                  className={`transition-transform duration-300 ease-in-out ${getImageClass(index)}`}
                  style={{
                    transform: `translateX(${(index - currentIndex) * 100 + (index > currentIndex ? +1 : 0) + (index < currentIndex ? +1 : 0)}%)`,
                    position: "absolute",
                    left: "35% md:40%",
                    top:
                      index === currentIndex
                        ? "30%"
                        : offset === 1
                          ? "32%"
                          : "35%",
                    transformOrigin: "center center",
                    marginTop: index === currentIndex ? "-30px" : "0",
                    marginBottom: index === currentIndex ? "-30px" : "0",
                    width:
                      index === currentIndex
                        ? "300px"
                        : offset === 1
                          ? "210px"
                          : "190px",
                    height:
                      index === currentIndex
                        ? "395px"
                        : offset === 1
                          ? "250px"
                          : "210px",
                    zIndex: zIndex,
                  }}
                >
                  <img
                    src={url.url}
                    alt={`Avatar ${index + 1}`}
                    className="h-full w-full rounded-lg object-cover"
                    style={{
                      maxHeight: index === currentIndex ? "395px" : "270px",
                      maxWidth: index === currentIndex ? "300px" : "210px",
                    }}
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

export default AvatarCarouselDesktop;
