import { useContext, useEffect, useState } from "react";
import { Profession } from "../../generated/graphql-types";
import { CharacterContext } from "../../contexts/CharacterContext";

type CarouselProfessionProps = {
  professions: Profession[];
};

function CarouselProfession({ professions }: CarouselProfessionProps) {
  const { character, setCharacter } = useContext(CharacterContext);

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    setCharacter({ ...character, profession: professions[currentIndex] });
  }, [character, currentIndex, professions, setCharacter]);

  const handleNav = (direction: number) => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex + direction + professions.length) % professions.length
    );
  };

  return (
    <section className="mt-4 flex items-center justify-center space-x-4 md:mt-10">
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
            src={professions[currentIndex]?.image?.path || ""}
            alt={professions[currentIndex]?.name || "Image non disponible"}
            className="mb-4 h-32 w-32 object-cover md:h-48 md:w-48 lg:h-60 lg:w-60"
          />
        </figure>
        <div>
          <h2 className="text-xl font-bold">
            {professions[currentIndex].name}
          </h2>
          <p className="max-w-[300px] break-words">
            {professions[currentIndex].description}
          </p>
          <ul className="pt-4">
            {professions[currentIndex].modifierAssignments
              ? professions[currentIndex].modifierAssignments.map(
                  (assignment, index) => (
                    <li key={index}>
                      {assignment.modifierLabel} : {assignment.value}
                    </li>
                  )
                )
              : null}
          </ul>
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
