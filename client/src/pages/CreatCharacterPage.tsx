import { useState } from "react";
import AvatarCarouselWrapper from "../components/CarouselWrapper";
import StatsCharacter from "../components/competitor/StatsCharacter";
import CarouselProfession from "../components/competitor/CarouselProfession";

const profession = [
  {
    professionName: "Philosopher",
    statsName: "Intelligence",
    value: 87,
    description:
      "Wow, it's an amazing job! You are an incredibly muscular philosopher!",
    link: "/img/dallePhilosopher1.png",
  },
  {
    professionName: "Blacksmith",
    statsName: "Force",
    value: 72,
    description:
      "Wow, it's an amazing job! You are an incredibly muscular blackSmith!",
    link: "/img/dalleForge1.png",
  },
  {
    professionName: "Sailor",
    statsName: "Agilité",
    value: 70,
    description:
      "Wow, it's an amazing job! You are an incredibly muscular sailor!",
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
function CreateCharacterPage() {
  const [prenom, setPrenom] = useState("");

  const handleChange = (e) => {
    setPrenom(e.target.value);
  };

  const [selectedCity, setSelectedCity] = useState("");

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const cities = ["Paris", "Lyon", "Marseille", "Toulouse"];

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setDropdownVisible(false);
  };

  return (
    <div className="-mt-14 h-full w-full p-2 backdrop-blur md:-mt-20 md:p-8 lg:-mt-20">
      <div className="flex flex-col items-center py-4">
        <div className="grid w-full grid-cols-2 gap-4 py-4">
          <div className="B flex flex-col items-center p-4">
            <label className="p-2">Quel est ton nom ?</label>
            <input
              type="text"
              placeholder="Entrez votre prénom"
              value={prenom}
              onChange={handleChange}
              className="w-full max-w-[200px] rounded border py-2 text-black sm:max-w-xs"
            />
          </div>
          <div className="C flex max-w-[300px] flex-col items-center p-4">
            <label className="p-2">Quel est ta ville ?</label>
            <div className="relative">
              <div
                onClick={() => setDropdownVisible(!isDropdownVisible)}
                className="min-w-[200px] cursor-pointer rounded-md border border-gray-300 bg-white py-2 text-black"
              >
                {selectedCity || "Sélectionnez une ville"}
              </div>

              {isDropdownVisible && (
                <div className="absolute z-30 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg">
                  {cities.map((city) => (
                    <div
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      className="cursor-pointer p-2 text-black hover:bg-gray-100"
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <AvatarCarouselWrapper imageUrls={imageUrls} />
      <CarouselProfession profession={profession} />
      <StatsCharacter stats={stats} />
    </div>
  );
}

export default CreateCharacterPage;
