import { useState } from "react";

import StatsCharacter from "../components/competitor/StatsCharacter";

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
    <div className="-mt-60 h-full w-full p-8 backdrop-blur md:-mt-40 lg:-mt-24">
      <div className="flex flex-col items-center py-4">
        <div className="grid w-full grid-cols-2 gap-4 py-4">
          <div className="B p-4">
            <div className="p-2">Quel est ton nom ?</div>
            <input
              type="text"
              placeholder="Entrez votre prénom"
              value={prenom}
              onChange={handleChange}
              className="w-full max-w-[200px] rounded border py-2 text-black sm:max-w-xs"
            />
          </div>
          <div className="C max-w-[300px] p-4">
            <div className="p-2">Quel est ta ville ?</div>
            <div className="relative">
              <div
                onClick={() => setDropdownVisible(!isDropdownVisible)}
                className="cursor-pointer rounded-md border border-gray-300 bg-white py-2 text-black"
              >
                {selectedCity || "Sélectionnez une ville"}
              </div>

              {isDropdownVisible && (
                <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg">
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

      <StatsCharacter />
    </div>
  );
}

export default CreateCharacterPage;
