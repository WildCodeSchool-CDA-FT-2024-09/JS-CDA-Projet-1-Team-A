import { useState, useEffect } from "react";
import { useCombatResultQuery } from "../../generated/graphql-types";

type ModaleResultTrialProps = {
  result: ResultType;
  playerImagePath: string;
  id: string;
};

type ResultType = {
  status: string | null;
  valueBtn: string;
};

export default function ModaleResultTrial({
  playerImagePath,
  id,
}: ModaleResultTrialProps) {
  const { data, loading, error } = useCombatResultQuery({
    variables: { combatResultId: id || "" },
  });

  const [result, setResult] = useState<string>("");

  useEffect(() => {
    if (data?.combatResult?.resultShortText.includes("perd")) {
      setResult("PERDU");
    } else {
      setResult("VICTOIRE");
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (!data) return <p>No data</p>;

  return (
    <div className="fixed inset-0 top-[170px] z-10 flex w-full flex-col items-center">
      {result && (
        <section className="relative flex h-[62vh] max-h-[62vh] w-[65vw] min-w-[280px] max-w-[700px] flex-col items-center justify-between rounded-xl bg-blue-fd bg-opacity-85 py-10">
          <img
            src={playerImagePath}
            alt="avatar du joueur"
            className={`w-44 rounded-xl ${result === "VICTOIRE" ? "" : "saturate-0"}`}
          />
          {result === "VICTOIRE" && (
            <section className="absolute flex h-[100%] justify-center align-baseline">
              <img
                src="/img/item/confetti.png"
                alt="confettis de la victoire"
                className="h-2/6 flex-initial md:h-3/6"
              />
              <img
                src="/img/item/cup.png"
                alt="coupe de la victoire"
                className="xl:top-1/5 md:w-46 absolute bottom-1/3 w-60 xl:w-60"
              />
            </section>
          )}
          <h2 className="mb-20 text-3xl font-bold">{result}</h2>
        </section>
      )}
    </div>
  );
}
