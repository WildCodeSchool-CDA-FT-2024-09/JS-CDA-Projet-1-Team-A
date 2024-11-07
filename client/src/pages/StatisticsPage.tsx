import { Link } from "react-router-dom";
import { useGetCombatStatsQuery } from "../generated/graphql-types";

function formatCombatDate(date: string) {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function StatisticsPage() {
  const { data, loading, error } = useGetCombatStatsQuery();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (!data) return <p>No data</p>;
  const { combats } = data;
  return (
    <main>
      <div className="mt-38 text-justif fixed left-1/2 top-1/2 mx-auto mb-8 max-h-[55vh] w-[70%] -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-xl bg-yellow-p bg-opacity-85 p-6 md:w-[40%] lg:w-1/3">
        <h2 className="mb-4 text-center text-2xl font-bold text-blue-v">
          L'histoire des combats
        </h2>
        <section>
          <ul>
            {combats.map((combat) => (
              <li key={combat.id} className="mb-4 text-blue-v">
                <Link to={`/statistiques/${combat.id}`}>
                  <h3 className="mb-1 font-bold text-stone-50 hover:underline">
                    {`${combat.player?.name} (${combat.playerGod.name})  vs. ${combat.opponent?.name} (${combat.opponentGod.name})`}
                  </h3>
                </Link>
                <p>Le {formatCombatDate(combat.createdAt)}</p>
                <p>Épreuve de {combat.trial.name}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <Link
        to="/"
        aria-label="Retourner à la page d'accueil"
        className="btn-primary fixed bottom-16 left-1/2 min-w-[220px] -translate-x-1/2 transform"
      >
        Retour accueil
      </Link>
    </main>
  );
}

export default StatisticsPage;
