import { useState, useEffect } from "react";
import AvatarCarouselDesktop from "./AvatarCarouselDesktop";
import AvatarCarouselMobile from "./AvatarCarouselMobile";

const AvatarCarouselWrapper = () => {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <>{isMobile ? <AvatarCarouselMobile /> : <AvatarCarouselDesktop />}</>;
};

export default AvatarCarouselWrapper;
