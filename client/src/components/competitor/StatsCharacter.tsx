import { Link } from "react-router-dom";
// Statistiques provisoires en attendant le back-end
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
function StatsCharacter() {
  return (
    <div className="flex w-full flex-col items-center md:flex-row md:justify-evenly">
      <section className="B m-6 w-full min-w-[280px] rounded-xl bg-blue-fd bg-opacity-85 p-2 md:mr-24 md:w-[400px]">
        <h2>Stats du joueur</h2>
        <ul className="grid grid-cols-2 gap-4 p-4">
          {stats.map((stat, index) => (
            <li key={index} className="flex justify-between">
              <span className="stat-name">{stat.statName}</span>
              <span className="texte-base">{stat.value}</span>
            </li>
          ))}
        </ul>
      </section>
      <Link
        to="/choose-god"
        aria-label="Commencer le jeu"
        className="btn-primary min-w-[220px] max-w-[230px]"
      >
        Démarre l'épreuve!
      </Link>
    </div>
  );
}

export default StatsCharacter;
