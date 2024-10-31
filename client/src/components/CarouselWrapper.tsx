import { useState, useEffect } from "react";
import AvatarCarouselDesktop from "./competitor/AvatarCarouselDesktop";
import AvatarCarouselMobile from "./competitor/AvatarCarouselMobile";

interface CarouselWrapperProps {
  imageUrls: { url: string }[];
}
const AvatarCarouselWrapper: React.FC<CarouselWrapperProps> = ({
  imageUrls,
}) => {
  const [isMobile, setIsMobile] = useState(false);

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
