import { Link } from "react-router-dom";

function StatsCharacter({ stats }) {
  return (
    <div className="flex w-full flex-col items-center md:flex-row md:justify-evenly">
      <div className="B m-6 w-full min-w-[280px] rounded-xl bg-blue-fd bg-opacity-85 p-2 md:mr-24 md:w-[400px]">
        <h2>Stats du joueur</h2>
        <ul className="grid grid-cols-2 gap-4 p-4">
          {stats.map((stat, index) => (
            <li key={index} className="flex justify-between">
              <span className="stat-name">{stat.statName}</span>
              <span className="stat-value">{stat.value}</span>
            </li>
          ))}
        </ul>
      </div>
      <Link
        to="/"
        aria-label="Start the game"
        className="btn-primary min-w-[220px] max-w-[230px] md:mr-24"
      >
        Démarre l'épreuve!
      </Link>
    </div>
  );
}

export default StatsCharacter;
