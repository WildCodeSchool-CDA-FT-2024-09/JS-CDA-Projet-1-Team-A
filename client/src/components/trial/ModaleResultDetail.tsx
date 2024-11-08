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
      <section className="bg-opacity-8 relative flex h-[62vh] max-h-[62vh] w-[65vw] min-w-[280px] max-w-[700px] flex-col items-center gap-6 rounded-xl bg-blue-fd p-8 md:p-16">
        <p className="text-center text-sm font-bold text-yellow-p md:text-2xl">
          {data.combatResult.resultShortText}
        </p>
        <p className="mt-4 text-justify text-sm md:mt-16 md:text-2xl">
          {data.combatResult.resultLongText}
        </p>
      </section>
    </div>
  );
};

export default ModaleResultDetail;
