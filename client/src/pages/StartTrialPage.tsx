import { useState } from "react";
import ModaleResultTrial from "../components/trial/ModaleResultTrial";
import ModaleResultDetail from "../components/trial/ModaleResultDetail";
import {
  useCombatQuery,
  useCombatResultQuery,
} from "../generated/graphql-types";
import { NavLink } from "react-router-dom";

const trial = {
  playerBonus: 8,
  opponentBonus: 9,
};

type ResultType = {
  status: string | null;
  valueBtn: string;
};

type DataKey = "ModaleResultTrial" | "ModaleResultDetail";
type DataType = {
  component: React.FC<{
    result: ResultType;
    playerImagePath: string;
    textTrial: string;
    id: string;
  }>;
  result: ResultType;
  playerImagePath: string;
  textTrial: string;
  id: string;
};

function StartTrialPage() {
  const [result, setResult] = useState<ResultType>({
    status: null,
    valueBtn: "Démarrer l'épreuve",
  });
  const [component, setComponent] = useState<DataKey | null>(null);
  const id = "c4f20523-f2aa-4d28-a2db-fed5271e45e2";

  const {
    data: combatData,
    loading,
    error,
  } = useCombatQuery({
    variables: { combatId: id },
  });

  const { data: combatResultData } = useCombatResultQuery({
    variables: { combatResultId: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!combatResultData) return <p>No data</p>;

  const modalData: Record<DataKey, DataType> = {
    ModaleResultTrial: {
      component: ModaleResultTrial,
      result: result,
      playerImagePath: combatData?.combat?.player?.image?.path || "",
      textTrial: combatData?.combat?.trial?.name || "",
      id,
    },
    ModaleResultDetail: {
      component: ModaleResultDetail,
      result: result,
      playerImagePath: combatData?.combat?.player?.image?.path || "",
      textTrial: "",
      id,
    },
  };

  const ComponentToRender = component ? modalData[component].component : null;

  const checkResult = () => {
    const newResult =
      combatResultData?.combatResult?.resultShortText.includes("gagne");
    let valueResult = "";

    if (newResult) {
      valueResult = "VICTOIRE";
    } else {
      valueResult = "DEFAITE";
    }

    if (component === null) {
      setResult({
        status: valueResult,
        valueBtn: "Voir le détail de l'épreuve",
      });
      setComponent("ModaleResultTrial");
    } else if (component === "ModaleResultTrial") {
      setComponent("ModaleResultDetail");
      setResult({
        status: result.status,
        valueBtn: "Retour au menu principal",
      });
    } else {
      setResult({
        status: null,
        valueBtn: "Démarrer l'épreuve",
      });
      setComponent(null);
    }
  };

  return (
    <section className="fixed inset-0 h-screen w-full items-center justify-center bg-blue-v/80 backdrop-blur-sm">
      <p className="center absolute mt-32 w-full text-center text-xl font-medium">
        {combatData?.combat?.player.name} vs {combatData?.combat?.opponent.name}
      </p>
      <article className="h-82 z-1 absolute z-10 mt-80 flex w-full flex-col items-center justify-center">
        <div className="flex h-[35%] w-[50%] flex-col items-center justify-around gap-y-3 rounded-xl bg-blue-fd bg-opacity-85 p-6 md:w-[30%]">
          <p>{combatData?.combat?.trial.name}</p>
          <img
            src={combatData?.combat?.trial?.image?.path || ""}
            className="w-80 object-contain md:w-48"
            alt={combatData?.combat?.trial?.name || "Image non disponible"}
          />
          <p className="text-yellow-p">
            Chance {trial.playerBonus} vs {trial.opponentBonus}
          </p>
        </div>
      </article>
      <div className="absolute inset-0 mt-24 hidden h-[50vh] justify-between md:flex">
        <img
          src={combatData?.combat?.opponentGod.image?.path}
          alt="Dieu de votre champion"
          className="h-auto max-w-full"
        />
        <img
          src={combatData?.combat?.playerGod.image?.path}
          alt="Dieu de votre opposant"
          className="h-auto max-w-full"
        />
      </div>
      <div className="relative flex h-full items-center justify-between md:items-end">
        <img
          src={combatData?.combat?.player?.image?.path || ""}
          alt="Avatar de votre champion"
          className={`absolute left-0 h-[45vh] w-auto -translate-x-28 translate-y-[-3rem] object-contain sm:translate-y-0 md:h-[70vh] md:-translate-x-0 ${
            result.status === "DEFAITE" &&
            result.valueBtn === "Voir le détail de l'épreuve"
              ? "saturate-0"
              : ""
          }`}
        />
        <img
          src={combatData?.combat?.opponent?.image?.path || ""}
          alt="Avatar de l'adversaire"
          className={`absolute right-0 h-[45vh] w-auto translate-x-28 translate-y-[-3rem] scale-x-[-1] object-contain sm:translate-y-0 md:h-[70vh] md:translate-x-0 ${
            result.status === "VICTOIRE" &&
            result.valueBtn === "Voir le détail de l'épreuve"
              ? "saturate-0"
              : ""
          }`}
        />
      </div>
      {ComponentToRender && (
        <ComponentToRender
          result={modalData[component!].result}
          playerImagePath={modalData[component!].playerImagePath}
          textTrial={modalData[component!].textTrial}
          id={modalData[component!].id}
        />
      )}
      {result.valueBtn === "Retour au menu principal" ? (
        <NavLink
          to="/"
          className="btn-primary fixed bottom-[200px] left-1/2 z-10 mx-0 min-w-[220px] max-w-[230px] -translate-x-1/2 transform font-medium"
        >
          Retour au menu principal
        </NavLink>
      ) : (
        <button
          className={`btn-primary fixed left-1/2 z-10 mx-0 min-w-[220px] max-w-[230px] -translate-x-1/2 transform font-medium ${
            result.status === null ? "bottom-[100px]" : "bottom-[200px]"
          }`}
          type="button"
          onClick={checkResult}
        >
          {result.valueBtn}
        </button>
      )}
    </section>
  );
}

export default StartTrialPage;
