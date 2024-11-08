import { useContext, useEffect, useRef } from "react";
import { CharacterContext } from "../contexts/CharacterContext";
import {
  useCreateTemporaryCompetitorMutation,
  useDeleteTemporaryCompetitorMutation,
} from "../generated/graphql-types";
import StatsCharacter from "../components/competitor/StatsCharacter";
import CarouselProfession from "../components/competitor/CarouselProfession";
import { useGetProfessionsQuery } from "../generated/graphql-types";
import AvatarCarouselWrapper from "../components/CarouselWrapper";
import { useGetImageFiltreQuery } from "../generated/graphql-types";

const cities = [
  "Athènes",
  "Sparte",
  "Thessalonique",
  "Corinthe",
  "Rhodes",
  "Delphes",
  "Olympie",
  "Argos",
  "Mycènes",
];

function CreateCharacterPage() {
  const { character, setCharacter, tempCharacter, setTempCharacter } =
    useContext(CharacterContext);
  const [
    createTemporaryCompetitor,
    {
      loading: competitorLoading,
      error: competitorError,
      data: competitorData,
    },
  ] = useCreateTemporaryCompetitorMutation();
  const [deleteTemporaryCompetitor] = useDeleteTemporaryCompetitorMutation();

  // Load temporary character in useEffect
  // NB The initialized ref workaround is to avoid calling createTemporaryCompetitor twice when we're running in React Strict Mode
  const initialized = useRef(false);
  // We need a ref to keep track of whether the beforeunload listener has been added
  const beforeUnloadAdded = useRef(false);
  useEffect(() => {
    if (!initialized.current) {
      createTemporaryCompetitor();
      initialized.current = true;
    }

    const cleanup = () => {
      if (
        tempCharacter &&
        tempCharacter.status === "temporary" &&
        tempCharacter.id
      ) {
        deleteTemporaryCompetitor({
          variables: {
            deleteTemporaryCompetitorId: tempCharacter.id as string,
          },
        });
      }
    };

    // Add the beforeunload listener only once
    if (!beforeUnloadAdded.current) {
      window.addEventListener("beforeunload", cleanup);
      beforeUnloadAdded.current = true;
    }

    return () => {
      // Run cleanup on unmount
      cleanup();
      if (beforeUnloadAdded.current) {
        window.removeEventListener("beforeunload", cleanup);
        beforeUnloadAdded.current = false;
      }
    };
  }, [createTemporaryCompetitor, deleteTemporaryCompetitor, tempCharacter]);

  // useEffect to set tempCharacter in context only after data is available
  useEffect(() => {
    if (competitorData && competitorData.createTemporaryCompetitor) {
      setTempCharacter(competitorData.createTemporaryCompetitor);
    }
  }, [competitorData, setTempCharacter]);

  const {
    data: imageData,
    loading: imageLoading,
    error: imageError,
  } = useGetImageFiltreQuery({
    variables: { type: "competitor_avatar" },
  });

  const {
    loading: professionsLoading,
    error: professionsError,
    data: professionsData,
  } = useGetProfessionsQuery();

  if (professionsLoading || competitorLoading || imageLoading)
    return <p>Loading...</p>;
  if (professionsError || competitorError || imageError) return <p>Error</p>;
  if (!professionsData || !competitorData || !imageData) return <p>No data</p>;

  const { professions } = professionsData;

  const imageUrls =
    imageData?.getImage.map((image) => ({
      url: image.path,
    })) || [];

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharacter({ ...character, name: e.target.value });
  };

  return (
    <section className="-mt-40 h-full w-full p-8 backdrop-blur md:-mt-40 lg:-mt-20">
      <div className="mt-12 flex flex-col items-center py-4 lg:mt-4">
        <form className="z-10 grid w-full grid-cols-2 gap-4 py-4">
          <div className="flex flex-col items-center p-4">
            <label className="p-2">Quel est ton nom ?</label>
            {tempCharacter && (
              <input
                type="text"
                placeholder={tempCharacter.name}
                value={character.name}
                onChange={(e) => handleNameInput(e)}
                className="w-full max-w-[200px] rounded border px-4 text-black sm:max-w-xs"
              />
            )}
          </div>
          <div className="flex w-full max-w-xs items-center">
            <select
              className="select w-full max-w-xs bg-transparent focus:bg-white focus:text-black"
              defaultValue="Quelle est ta ville ?"
            >
              <option disabled className="text-gray-500">
                Quelle est ta ville ?
              </option>
              {cities.map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>
          </div>
        </form>
      </div>
      <AvatarCarouselWrapper
        imageUrls={imageUrls}
        myTitle="Choisissez votre Avatar"
      />
      {professions && professions.length && (
        <CarouselProfession professions={professions} />
      )}
      {tempCharacter &&
        tempCharacter.modifierAssignments &&
        tempCharacter.modifierAssignments.length > 0 && (
          <StatsCharacter stats={tempCharacter.modifierAssignments} />
        )}
    </section>
  );
}

export default CreateCharacterPage;
