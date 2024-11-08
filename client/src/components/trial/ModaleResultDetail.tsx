import { useCombatResultQuery } from "../../generated/graphql-types";

type ResultType = {
  status: string | null;
  valueBtn: string;
};
type ModaleResultDetailProps = {
  result: ResultType;
  textTrial: string;
  id: string;
};

const ModaleResultDetail: React.FC<ModaleResultDetailProps> = ({ id }) => {
  const { data, loading, error } = useCombatResultQuery({
    variables: { combatResultId: id || "" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (!data) return <p>No data</p>;

  return (
    <div className="fixed inset-0 top-[170px] z-10 flex w-full flex-col items-center">
      <section className="relative flex h-[62vh] max-h-[62vh] w-[65vw] min-w-[280px] max-w-[700px] flex-col items-center gap-6 rounded-xl bg-blue-fd bg-opacity-85 py-10">
        <p>Résultat : {data.combatResult.resultShortText}</p>
        <p>Résultat : {data.combatResult.resultLongText}</p>
      </section>
    </div>
  );
};

export default ModaleResultDetail;
