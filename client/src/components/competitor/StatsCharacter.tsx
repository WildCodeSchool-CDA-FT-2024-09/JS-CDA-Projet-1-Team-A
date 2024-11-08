import { Link } from "react-router-dom";
import { CompetitorModifiers } from "../../generated/graphql-types";
import { useContext } from "react";
import { CharacterContext } from "../../contexts/CharacterContext";

function StatsCharacter({ stats }: { stats: CompetitorModifiers[] }) {
  const { character } = useContext(CharacterContext);

  const checkForStatBonus = (modifierLabel: string) => {
    const profession = character.profession;
    if (profession && profession?.modifierAssignments) {
      const stat = profession.modifierAssignments.find(
        (stat) => stat.modifierLabel === modifierLabel
      );
      if (stat) {
        return stat.value;
      }
    }
    return 0;
  };

  return (
    <div className="flex w-full flex-col items-center md:flex-row md:justify-evenly">
      <section className="B m-6 w-full min-w-[280px] rounded-xl bg-blue-fd bg-opacity-85 p-2 md:mr-24 md:w-[400px]">
        <h2>Stats du joueur</h2>
        <ul className="grid grid-cols-2 gap-4 p-4">
          {stats.map((stat, index) => (
            <li key={index} className="flex justify-between">
              <span className="stat-name">{stat.modifierLabel}</span>
              <span className="stat-value">
                {stat.value}
                <span className="ml-1 text-xl text-blue-v">
                  {`${checkForStatBonus(stat.modifierLabel) > 0 ? `+${checkForStatBonus(stat.modifierLabel)}` : ""}`}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>
      <Link
        to="/choix-du-dieu"
        aria-label="Commencer le jeu"
        className="btn-primary min-w-[220px] max-w-[230px]"
      >
        Démarre l'épreuve!
      </Link>
    </div>
  );
}

export default StatsCharacter;
