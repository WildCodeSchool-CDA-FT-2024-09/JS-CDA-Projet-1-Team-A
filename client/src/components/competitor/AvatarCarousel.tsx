const AvatarCarousel = ({
  imageUrls,
  myTitle,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  handleMouseDown,
  isDragging,
  handleMouseMove,
  handleMouseUp,
  currentIndex,
  mobile,
}) => {
  const getImageClassDes = (index: number) => {
    const offset = Math.abs(index - currentIndex);
    if (offset === 0) return "w-[300px] h-[395px]"; // Image centrale
    if (offset === 1) return "w-[210px] h-[250px]"; // Images adjacentes
    if (offset === 2) return "w-[190px] h-[210px]"; // Images adjacentes +1
    return "hidden"; // Images adjacentes +2
  };
  const getImageClassMob = (index: number) => {
    const offset = Math.abs(index - currentIndex);
    if (offset === 0) return "w-[125px] h-[130px]"; // Image centrale
    if (offset === 1) return "w-[90px] h-[110px]"; // Images adjacentes
    return "hidden"; // Cacher les images qui ne sont pas adjacentes
  };

  return (
    <>
      <section aria-labelledby="title-avatar">
        <p className="pt-5" id="title-avatar">
          {myTitle}
        </p>
        <div
          className={`flex w-full items-center justify-center overflow-hidden ${mobile ? "h-44" : "h-96"}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={mobile ? undefined : handleMouseDown}
          onMouseMove={!mobile && isDragging ? handleMouseMove : undefined}
          onMouseUp={!mobile ? handleMouseUp : undefined}
        >
          <div
            className={`relative flex w-full items-center justify-center overflow-hidden ${mobile ? "h-full" : "h-[700px]"}`}
          >
            {imageUrls.map((url, index) => {
              const offset = Math.abs(index - currentIndex);
              const zIndex = index === currentIndex ? 10 : offset === 1 ? 5 : 0;

              return (
                <figure
                  key={index}
                  className={`transition-transform duration-300 ease-in-out ${mobile ? getImageClassMob(index) : getImageClassDes(index)}`}
                  style={{
                    transform: `translateX(${(index - currentIndex) * 100 + (index > currentIndex ? (mobile ? +10 : +5) : 0) + (index < currentIndex ? -5 : 0)}%)`,
                    position: "absolute",
                    left: `md:40% ${mobile ? "20%" : "35%"}`,
                    top: mobile
                      ? index === currentIndex
                        ? "10%"
                        : "11%"
                      : index === currentIndex
                        ? "30%"
                        : offset === 1
                          ? "32%"
                          : "35%",
                    transformOrigin: mobile ? undefined : "center center",
                    marginTop: `${index === currentIndex ? (mobile ? "-10px" : "-30px") : "0"}`,
                    marginBottom: `${index === currentIndex ? (mobile ? "-10px" : "-30px") : "0"}`,
                    width: !mobile
                      ? index === currentIndex
                        ? "300px"
                        : offset === 1
                          ? "210px"
                          : "190px"
                      : undefined,
                    height: !mobile
                      ? index === currentIndex
                        ? "395px"
                        : offset === 1
                          ? "250px"
                          : "210px"
                      : undefined,
                    zIndex: zIndex,
                  }}
                >
                  <img
                    src={url.url}
                    alt={`Avatar ${index + 1}`}
                    className="h-full w-full rounded-lg object-cover"
                    style={
                      !mobile
                        ? {
                            maxHeight:
                              index === currentIndex ? "395px" : "270px",
                            maxWidth:
                              index === currentIndex ? "300px" : "210px",
                          }
                        : undefined
                    }
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

export default AvatarCarousel;
