import { useState } from "react";

function CarouselProfession({ profession }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNav = (direction) => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex + direction + profession.length) % profession.length
    );
  };

  return (
    <section className="mt-4 flex items-center justify-center space-x-4">
      <button
        onClick={() => handleNav(-1)}
        className="h-8 w-8 rounded bg-[url('/img/arrowL.png')] bg-cover bg-center transition hover:opacity-80 md:h-12 md:w-12"
        aria-label="Précédent"
      />
      <article
        className="flex flex-row items-center space-x-4 rounded-lg border bg-blue-fd bg-opacity-85 p-4"
        aria-labelledby="titre-profession"
      >
        <figure>
          <img
            src={profession[currentIndex].link}
            alt={profession[currentIndex].professionName}
            className="mb-4 h-32 w-32 object-cover md:h-48 md:w-48 lg:h-60 lg:w-60"
          />
        </figure>
        <div>
          <h2 className="text-xl font-bold text-gray-700">
            {profession[currentIndex].professionName}
          </h2>
          <p className="max-w-[300px] break-words text-gray-700">
            {profession[currentIndex].description}
          </p>
          <p className="pt-4 text-gray-700">
            {profession[currentIndex].statsName}{" "}
            {profession[currentIndex].value}
          </p>
        </div>
      </article>
      <button
        onClick={() => handleNav(1)}
        className="h-8 w-8 rounded bg-[url('/img/arrowR.png')] bg-cover bg-center transition hover:opacity-80 md:h-12 md:w-12"
        aria-label="Suivant"
      />
    </section>
  );
}

export default CarouselProfession;
