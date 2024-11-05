import { useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";
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
  const { character, setCharacter } = useContext(CharacterContext);

  return (
    <section className="-mt-20 h-full w-full p-4 pt-8 backdrop-blur md:p-8">
      <div className="flex flex-col items-center py-4">
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
      <AvatarCarouselWrapper imageUrls={imageUrls} />
      <CarouselProfession profession={profession} />
      <StatsCharacter stats={stats} />
    </section>
  );
}

export default CreateCharacterPage;
