import { useState } from "react";

function CreateCharacterPage() {
  const stats = [
    {
      statName: "Intelligence",
      value: 870,
    },
    {
      statName: "Force",
      value: 725,
    },
    {
      statName: "Agilité",
      value: 710,
    },
    {
      statName: "Endurance",
      value: 905,
    },
    {
      statName: "Charisme",
      value: 1465,
    },
    {
      statName: "Sagesse",
      value: 850,
    },
    { statName: "Chance", value: 1450 },
  ];

  const [prenom, setPrenom] = useState(""); // État pour stocker le prénom

  const handleChange = (e) => {
    setPrenom(e.target.value); // Met à jour l'état avec la valeur de l'input
  };

  const [selectedCity, setSelectedCity] = useState("");
  // État pour gérer l'affichage du menu déroulant
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // Liste de villes (tu peux remplacer cela par tes données de la BDD)
  const cities = ["Paris", "Lyon", "Marseille", "Toulouse"];

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setDropdownVisible(false); // Masquer le menu déroulant
  };

  return (
    <>
      <div className="flex flex-col items-center py-4">
        input
        <div className="grid w-full grid-cols-2 gap-4 py-4">
          <div className="B py-4">
            <div>input prénom</div>
            <input
              type="text"
              placeholder="Entrez votre prénom"
              value={prenom}
              onChange={handleChange} // Appel de la fonction lors du changement de valeur
              className="rounded border py-2" // Classes Tailwind pour le style de l'input
            />
          </div>
          <div className="C max-w-[300px] p-4">
            <div>input ville</div>
            <div className="relative">
              {/* Input qui affiche la ville sélectionnée ou un texte par défaut */}
              <div
                onClick={() => setDropdownVisible(!isDropdownVisible)} // Toggle dropdown visibility
                className="cursor-pointer rounded-md border border-gray-300 py-2"
              >
                {selectedCity || "Sélectionnez une ville"}
              </div>

              {/* Menu déroulant */}
              {isDropdownVisible && (
                <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg">
                  {cities.map((city) => (
                    <div
                      key={city}
                      onClick={() => handleCitySelect(city)} // Sélectionner la ville
                      className="cursor-pointer p-2 hover:bg-gray-100"
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
      <div>{/* <AvatarCarouselWrapper />  */}</div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-evenly">
        <div className="B w-full min-w-[280px] md:w-[400px]">
          <div>stats du joueur</div>
          <div className="grid grid-cols-2 gap-4 p-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex justify-between">
                <div className="stat-name">{stat.statName}</div>
                <div className="stat-value">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="C">start</div>
      </div>
    </>
  );
}

export default CreateCharacterPage;
