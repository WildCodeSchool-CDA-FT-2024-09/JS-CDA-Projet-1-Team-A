import { Link } from "react-router-dom";
import { useCombatResultQuery } from "../generated/graphql-types";
import { useParams } from "react-router-dom";

function StatisticsDetailPage() {
  const id = useParams<{ id: string }>().id;
  const { data, loading, error } = useCombatResultQuery({
    variables: { combatResultId: id || "" },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (!data) return <p>No data</p>;
  const { combatResult } = data;
  return (
    <main>
      <div className="mt-38 text-justif fixed left-1/2 top-1/2 mx-auto mb-8 max-h-[55vh] w-[70%] -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-xl bg-yellow-p bg-opacity-85 p-6 md:w-[40%] lg:w-1/3">
        <h2 className="mb-4 text-center text-2xl font-bold text-blue-v">
          Le combat
        </h2>
        <section>
          <h3 className="mb-4 font-semibold text-blue-v">
            {combatResult.resultShortText}
          </h3>
          <p className="text-justify">{combatResult.resultLongText}</p>
        </section>
      </div>
      <Link
        to="/statistiques"
        aria-label="Retourner statistiques"
        className="btn-primary fixed bottom-16 left-1/2 min-w-[220px] -translate-x-1/2 transform"
      >
        Retour statistiques
      </Link>
    </main>
  );
}

export default StatisticsDetailPage;
