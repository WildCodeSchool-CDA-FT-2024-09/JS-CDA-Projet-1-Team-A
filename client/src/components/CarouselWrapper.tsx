import { useState, useEffect } from "react";
import AvatarCarouselDesktop from "./competitor/AvatarCarouselDesktop";
import AvatarCarouselMobile from "./competitor/AvatarCarouselMobile";

interface CarouselWrapperProps {
  imageUrls: { url: string }[]; // Type de l'image
}

// Correction ici : utiliser React.FC<CarouselWrapperProps>
const AvatarCarouselWrapper: React.FC<CarouselWrapperProps> = ({
  imageUrls,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize(); // Vérifier la taille initiale lors du montage
    window.addEventListener("resize", handleResize); // Écouter les changements de taille

    return () => window.removeEventListener("resize", handleResize); // Nettoyer l'écouteur
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

export default AvatarCarouselWrapper; // N'oublie pas d'exporter le composant
