import { useState } from "react";
import ModaleResultTrial from "../components/trial/ModaleResultTrial";

// en attente de réccupérer les données du joueur / opposant
const trial = {
  name: "la cours de char",
  playerName: "Julius",
  opponentName: "Tomastrius",
  playerBonus: 8,
  opponentBonus: 9,
};

function StartTrialPage() {
  const [result, setResult] = useState("");
  const resultTrial = ["DEFAITE", "VICTOIRE"];

  const checkResult = () => {
    // en attente du recupérer les information du résulta d'épreuve
    setResult(resultTrial[Math.floor(Math.random() * resultTrial.length)]);
  };

  return (
    <section className="fixed inset-0 h-screen w-full items-center justify-center bg-blue-v/80 backdrop-blur-sm">
      <p className="center absolute mt-32 w-full text-center text-xl font-medium">
        {trial.playerName} vs {trial.opponentName}
      </p>
      <article className="h-82 z-1 absolute z-10 mt-80 flex w-full flex-col items-center justify-center">
        <div className="flex h-[35%] w-[50%] flex-col items-center justify-around gap-y-3 rounded-xl bg-blue-fd bg-opacity-85 p-6 md:w-[30%]">
          <p>{trial.name}</p>
          <img
            src="/img/competitors/trial/char.png"
            className="w-80 object-contain md:w-48"
            alt={trial.name}
          />
          <p className="text-yellow-p">
            Chance {trial.playerBonus} vs {trial.opponentBonus}
          </p>
        </div>
      </article>
      {/* Div contenant les dieux en tant qu'images d'arrière-plan et visible uniquement à partir de md  */}
      <div className="absolute inset-0 mt-24 hidden h-[50vh] justify-between md:flex">
        <img
          src="/img/gods/freepik__adorable-cargerge.png"
          alt="Dieu de votre champion"
          className="h-auto max-w-full"
        />
        <img
          src="/img/gods/fq.png"
          alt="Dieu de votre opposant"
          className="h-auto max-w-full"
        />
      </div>
      {/* Div contenant les avatars */}
      <div className="relative flex h-full items-center justify-between md:items-end">
        {/* Avatar 1 - à gauche */}
        <img
          src="/img/competitors/battle/1.png"
          alt="Avatar de votre champion"
          className={`absolute left-0 h-[45vh] w-auto -translate-x-28 translate-y-[-3rem] object-contain sm:translate-y-0 md:h-[70vh] md:-translate-x-0 ${result !== "DEFAITE" ? "" : "saturate-0"}`}
        />
        {/* Avatar 2 - à droite */}
        <img
          src="/img/competitors/battle/2.png"
          alt="Avatar de l'adversaire"
          className={`absolute right-0 h-[45vh] w-auto translate-x-28 translate-y-[-3rem] scale-x-[-1] object-contain sm:translate-y-0 md:h-[70vh] md:translate-x-0 ${result !== "VICTOIRE" ? "" : "saturate-0"}`}
        />
      </div>
      {/* modale qui change en fonction du resulta pas encore fonctionnel */}
      <ModaleResultTrial result={result} />
      {/* bouton pour afficher le resulta de l'épreuve */}
      <button
        className={`btn-primary fixed left-1/2 z-10 mx-0 min-w-[220px] max-w-[230px] -translate-x-1/2 transform font-medium ${
          result === "" ? "bottom-[100px]" : "bottom-[200px]"
        }`}
        onClick={checkResulta}
      >
        Démarrer l'épreuve
      </button>
    </section>
  );
}

export default StartTrialPage;
