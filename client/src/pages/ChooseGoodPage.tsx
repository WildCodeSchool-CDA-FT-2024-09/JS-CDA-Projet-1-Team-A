//import course from "../../public/img/course_de_de_char.png";

import { Link } from "react-router-dom";

function ChooseGoodPage() {
  // Statistiques provisoires en attendant le back-end
  const trial = [
    {
      id: 1,
      path: "/img/course_de_de_char.png",
      name: "La course de char",
      description:
        "Seras tu plus rapide que ton adversaire ? Tu auras besoin de vitesse face à l'adversitée",
    },
  ];

  return (
    <div className="flex flex-col">
      <h1 className="mb-4 text-xl font-bold">Champion</h1>

      <section className="m-6 rounded-lg bg-blue-fd bg-opacity-85 p-2 shadow-md">
        <ul>
          <h1 className="mb-4 text-xl font-bold">Voici ton épreuve</h1>
          {trial.map((item) => (
            <li key={item.id} className="mb-4">
              <h2 className="m-4 text-lg font-semibold">{item.name}</h2>
              <section className="flex flex-row items-center gap-2">
                <img
                  src={item.path}
                  alt="course de char"
                  className="h-50 w-50 rounded-md object-cover"
                />
                <p>{item.description}</p>
              </section>
            </li>
          ))}
        </ul>
      </section>
      <Link
        to="/"
        aria-label="Commencer le jeu"
        className="btn-primary min-w-[220px] max-w-[230px] md:mr-24"
      >
        Démarre l'épreuve!
      </Link>
    </div>
  );
}

export default ChooseGoodPage;
