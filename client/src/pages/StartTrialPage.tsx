import { useState } from "react";
import ModaleResultTrial from "../components/trial/ModaleResultTrial";
import { useCombatQuery } from "../generated/graphql-types";

// en attente de récupérer les bonus du joueur / opposant
const trial = {
  playerBonus: 8,
  opponentBonus: 9,
};

function StartTrialPage() {
  const [result, setResult] = useState("");
  const resultTrial = ["DEFAITE", "VICTOIRE"];

  // en attente de reçevoir "id" de l'épreuve en cours pour l'afficher dynamiquement
  const id: string = "3d7801bb-1d3e-4d41-bf18-b74d848f92b5";

  const { data, loading, error } = useCombatQuery({
    variables: { combatId: id },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching combat data:", error);
    return <p>Error: {error.message}</p>;
  }

  // en attente du récupérer les informations du résulta d'épreuve
  const checkResult = () => {
    setResult(resultTrial[Math.floor(Math.random() * resultTrial.length)]);
  };

  return (
    <section className="fixed inset-0 h-screen w-full items-center justify-center bg-blue-v/80 backdrop-blur-sm">
      <p className="center absolute mt-32 w-full text-center text-xl font-medium">
        {data?.combat?.player.name} vs {data?.combat?.opponent.name}
      </p>
      <article className="h-82 z-1 absolute z-10 mt-80 flex w-full flex-col items-center justify-center">
        <div className="flex h-[35%] w-[50%] flex-col items-center justify-around gap-y-3 rounded-xl bg-blue-fd bg-opacity-85 p-6 md:w-[30%]">
          <p>{data?.combat?.trial.name}</p>
          <img
            src={data?.combat?.trial?.image?.path || ""}
            className="w-80 object-contain md:w-48"
            alt={data?.combat?.trial.name}
          />
          <p className="text-yellow-p">
            Chance {trial.playerBonus} vs {trial.opponentBonus}
          </p>
        </div>
      </article>
      {/* Div contenant les dieux en tant qu'images d'arrière-plan et visible uniquement à partir de md  */}
      <div className="absolute inset-0 mt-24 hidden h-[50vh] justify-between md:flex">
        <img
          src={data?.combat?.opponentGod.image?.path}
          alt="Dieu de votre champion"
          className="h-auto max-w-full"
        />
        <img
          src={data?.combat?.playerGod.image?.path}
          alt="Dieu de votre opposant"
          className="h-auto max-w-full"
        />
      </div>
      {/* Div contenant les avatars */}
      <div className="relative flex h-full items-center justify-between md:items-end">
        {/* Avatar 1 - à gauche */}
        <img
          src={data?.combat?.player?.image?.path || ""}
          alt="Avatar de votre champion"
          className={`absolute left-0 h-[45vh] w-auto -translate-x-28 translate-y-[-3rem] object-contain sm:translate-y-0 md:h-[70vh] md:-translate-x-0 ${result !== "DEFAITE" ? "" : "saturate-0"}`}
        />
        {/* Avatar 2 - à droite */}
        <img
          src={data?.combat?.opponent?.image?.path || ""}
          alt="Avatar de l'adversaire"
          className={`absolute right-0 h-[45vh] w-auto translate-x-28 translate-y-[-3rem] scale-x-[-1] object-contain sm:translate-y-0 md:h-[70vh] md:translate-x-0 ${result !== "VICTOIRE" ? "" : "saturate-0"}`}
        />
      </div>
      <ModaleResultTrial result={result} />
      {/* bouton pour afficher le resultat de l'épreuve */}
      <button
        className={`btn-primary fixed left-1/2 z-10 mx-0 min-w-[220px] max-w-[230px] -translate-x-1/2 transform font-medium ${
          result === "" ? "bottom-[100px]" : "bottom-[200px]"
        }`}
        onClick={checkResult}
      >
        Démarrer l'épreuve
      </button>
    </section>
  );
}

export default StartTrialPage;
