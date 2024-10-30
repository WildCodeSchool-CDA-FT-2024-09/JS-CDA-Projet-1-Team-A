import { useState } from "react";
import ModaleResultTrial from "../components/trial/ModaleResultTrial";

// en attente du recupérer les information du résulta d'épreuve
const resultTrial: { status: string }[] = [
  { status: "VICTOIRE" },
  { status: "DEFAITE" },
];

function StartTrialPage() {
  const [result, setResult] = useState(false);

  return (
    <section className="fixed inset-0 h-screen w-full bg-black/50 backdrop-blur-sm">
      {/* Contenu de la section */}
      <div className="relative mt-24 p-8">
        <h1 className="text-4xl text-white">Votre Contenu</h1>
      </div>
      {/* modale qui change en fonction du resulta pas encore fonctionnel */}
      <ModaleResultTrial result={result} resultTrial={resultTrial[0]} />

      {/* bouton pour afficher le resulta de l'épreuve */}

      <button
        className={`btn-primary fixed left-1/2 mx-0 min-w-[220px] max-w-[230px] -translate-x-1/2 transform ${!result ? "bottom-[100px]" : "bottom-[200px]"}`}
        onClick={() => setResult(!result)}
      >
        Démarrer l'épreuve
      </button>
    </section>
  );
}

export default StartTrialPage;
