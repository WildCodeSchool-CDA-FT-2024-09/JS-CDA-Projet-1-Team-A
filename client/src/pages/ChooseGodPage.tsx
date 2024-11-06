import { useContext } from "react";
import { Link } from "react-router-dom";
import { CharacterContext } from "../contexts/CharacterContext";
import AvatarCarouselWrapper from "../components/CarouselWrapper";

function ChooseGodPage() {
  const { character } = useContext(CharacterContext);
  // Statistiques provisoires en attendant le back-end
  const trial = [
    {
      id: 1,
      path: "/img/course_de_de_char.png",
      name: "La course de char",
      description:
        "Seras-tu plus rapide que ton adversaire ? Tu auras besoin de vitesse face à l'adversité.",
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

  const myTitle = "Choisissez votre Dieu";
  return (
    <div className="inset-0 flex h-screen w-full flex-col bg-black/50 backdrop-blur-sm">
      <h1 className="mt-5 text-xl font-bold">Champion {character}</h1>
      <section className="m-6 rounded-lg bg-blue-fd bg-opacity-85 p-2 shadow-md">
        <ul>
          <h2 className="mb-4 text-xl font-bold">Voici ton épreuve</h2>
          {trial.map((item) => (
            <li key={item.id} className="mb-4">
              <h3 className="m-4 text-lg font-semibold">{item.name}</h3>
              <section className="flex flex-row items-center gap-2">
                <img
                  src={item.path}
                  alt={item.name}
                  className="h-50 w-50 rounded-md object-cover"
                />
                <p>{item.description}</p>
              </section>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <AvatarCarouselWrapper imageUrls={imageUrls} myTitle={myTitle} />
      </section>
      <Link
        to="/epreuve"
        aria-label="Commencer le jeu"
        className="btn-primary mx-40 min-w-[220px] md:mr-24"
      >
        Démarre l'épreuve!
      </Link>
    </div>
  );
}

export default ChooseGodPage;
