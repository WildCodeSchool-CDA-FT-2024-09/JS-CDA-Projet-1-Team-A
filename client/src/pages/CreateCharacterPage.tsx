import { useContext, useEffect, useRef } from "react";
import { CharacterContext } from "../contexts/CharacterContext";
import {
  useCreateTemporaryCompetitorMutation,
  useDeleteTemporaryCompetitorMutation,
} from "../generated/graphql-types";
import StatsCharacter from "../components/competitor/StatsCharacter";
import CarouselProfession from "../components/competitor/CarouselProfession";
import AvatarCarouselWrapper from "../components/CarouselWrapper";

// Fausse donnée en attendant le back end
const profession = [
  {
    professionName: "Philosophe",
    statsName: "Intelligence",
    value: 87,
    description:
      "Wow, c'est un métier incroyable ! Vous êtes un philosophe incroyablement musclé !",
    link: "/img/dallePhilosopher1.png",
  },
  {
    professionName: "Forgeron",
    statsName: "Force",
    value: 72,
    description:
      "Wow, c'est un métier incroyable ! Vous êtes un forgeron incroyablement musclé !",
    link: "/img/dalleForge1.png",
  },
  {
    professionName: "Marin",
    statsName: "Agilité",
    value: 70,
    description:
      "Wow, c'est un métier incroyable ! Vous êtes un marin incroyablement musclé !",

    link: "/img/dalleSailor1.png",
  },
];
const imageUrls = [
  { url: "/img/freepik-apollon1.png" },
  { url: "/img/freepik-artemis1.png" },
  { url: "/img/freepik-dionysos1.png" },
  { url: "/img/freepik-gracefully1.png" },
  { url: "/img/freepik-zeus1.png" },
  { url: "/img/freepik-apollon1.png" },
  { url: "/img/freepik-artemis1.png" },
  { url: "/img/freepik-dionysos1.png" },
  { url: "/img/freepik-gracefully1.png" },
  { url: "/img/freepik-zeus1.png" },
];
const cities = ["Paris", "Lyon", "Marseille", "Toulouse"];
function CreateCharacterPage() {
  const { character, setCharacter, tempCharacter, setTempCharacter } =
    useContext(CharacterContext);
  const [createTemporaryCompetitor, { loading, error, data }] =
    useCreateTemporaryCompetitorMutation();
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
    if (data && data.createTemporaryCompetitor) {
      setTempCharacter(data.createTemporaryCompetitor);
    }
  }, [data, setTempCharacter]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (!data) return <p>No data</p>;

  return (
    <section className="-mt-20 h-full w-full p-4 pt-8 backdrop-blur md:p-8">
      <div className="flex flex-col items-center py-4">
        <form className="grid w-full grid-cols-2 gap-4 py-4">
          <div className="flex flex-col items-center p-4">
            <label className="p-2">Quel est ton nom ?</label>
            {tempCharacter && (
              <input
                type="text"
                placeholder={tempCharacter.name}
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
                className="w-full max-w-[200px] rounded border px-2 px-4 text-black sm:max-w-xs"
              />
            )}
          </div>
          <div className="flex w-full max-w-xs items-center">
            <select className="select w-full max-w-xs bg-transparent focus:bg-white focus:text-black">
              <option disabled selected className="text-gray-500">
                Quelle est ta ville ?
              </option>
              {cities.map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>
          </div>
        </form>
      </div>
      <AvatarCarouselWrapper imageUrls={imageUrls} />
      <CarouselProfession profession={profession} />
      {tempCharacter &&
        tempCharacter.modifierAssignments &&
        tempCharacter.modifierAssignments.length > 0 && (
          <StatsCharacter stats={tempCharacter.modifierAssignments} />
        )}
    </section>
  );
}

export default CreateCharacterPage;
