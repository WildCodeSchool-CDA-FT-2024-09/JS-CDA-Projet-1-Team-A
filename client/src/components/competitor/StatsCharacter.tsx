import React from "react";
import { Link } from "react-router-dom";

function StatsCharacter() {
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
  return (
    <div className="flex w-full flex-col items-center md:flex-row md:justify-evenly">
      <div className="B m-6 w-full min-w-[280px] rounded-xl bg-blue-fd bg-opacity-85 p-2 md:mr-24 md:w-[400px]">
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
