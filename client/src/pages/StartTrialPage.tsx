import { useState } from "react";
import ModaleResultTrial from "../components/trial/ModaleResultTrial";

// en attente du recupérer les information du résulta d'épreuve
const resultTrial: { [key: string]: { status: string } } = {
  victoire: { status: "VICTOIRE" },
  defaite: { status: "DEFAITE" },
};

function StartTrialPage() {
  const [result, setResult] = useState("");

  const checkResulta = () => {
    if (resultTrial.victoire.status === "VICTOIRE") {
      setResult("VICTOIRE"); // Si le statut est "VICTOIRE", on met à jour le résultat
    } else if (resultTrial.defaite.status === "DEFAITE") {
      setResult("DEFAITE"); // Si le statut est "DEFAITE", on met à jour le résultat
    }
  };

  return (
    <section className="fixed inset-0 h-screen w-full bg-blue-v/80 backdrop-blur-sm">
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
        className={`btn-primary fixed left-1/2 mx-0 min-w-[220px] max-w-[230px] -translate-x-1/2 transform ${
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
