import { useState } from "react";

import StatsCharacter from "../components/competitor/StatsCharacter";

function CreateCharacterPage() {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const cities = ["Paris", "Lyon", "Marseille", "Toulouse"];

  return (
    <section className="-mt-60 h-full w-full p-8 backdrop-blur md:-mt-40 lg:-mt-24">
      <div className="flex flex-col items-center py-4">
        <div className="grid w-full grid-cols-2 gap-4 py-4">
          <div className="B flex flex-col items-center p-4">
            <label className="p-2">Quel est ton nom ?</label>
            <input
              type="text"
              placeholder="Entrez votre prénom"
              value={name}
              onChange={handleChange}
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
        </div>
      </div>

      <StatsCharacter />
    </section>
  );
}

export default CreateCharacterPage;
