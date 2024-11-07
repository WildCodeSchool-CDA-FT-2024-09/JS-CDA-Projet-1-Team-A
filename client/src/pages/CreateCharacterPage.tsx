import { useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";
import StatsCharacter from "../components/competitor/StatsCharacter";
import CarouselProfession from "../components/competitor/CarouselProfession";
import AvatarCarouselWrapper from "../components/CarouselWrapper";
import { useGetImageFiltreQuery } from "../generated/graphql-types";

const stats = [
  {
    statName: "Intelligence",
    value: 87,
  },
  {
    statName: "Force",
    value: 72,
  },
  {
    statName: "Agilité",
    value: 70,
  },
  {
    statName: "Endurance",
    value: 95,
  },
  {
    statName: "Charisme",
    value: 45,
  },
  {
    statName: "Sagesse",
    value: 85,
  },
  { statName: "Chance", value: 50 },
];

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
  const { data, loading, error } = useGetImageFiltreQuery({
    variables: { type: "competitor_avatar" },
  });
  const { character, setCharacter } = useContext(CharacterContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const imageUrls =
    data?.getImage.map((image) => ({
      url: image.path,
    })) || [];

  return (
    <section className="-mt-40 h-full w-full p-8 backdrop-blur md:-mt-40 lg:-mt-20">
      <div className="mt-12 flex flex-col items-center py-4 lg:mt-4">
        <form className="grid w-full grid-cols-2 gap-4 py-4">
          <div className="flex flex-col items-center p-4">
            <label className="p-2">Quel est ton nom ?</label>
            <input
              type="text"
              placeholder="Entrez votre prénom"
              value={character}
              onChange={(e) => setCharacter(e.target.value)}
              className="w-full max-w-[200px] rounded border py-2 text-black sm:max-w-xs"
            />
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
      <AvatarCarouselWrapper
        imageUrls={imageUrls}
        myTitle="Choisissez votre Avatar"
      />
      <CarouselProfession profession={profession} />
      <StatsCharacter stats={stats} />
    </section>
  );
}

export default CreateCharacterPage;
