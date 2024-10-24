import { Link } from "react-router-dom";

function RulesPage() {
  return (
    <main>
      <div className="mt-30 fixed left-1/2 top-1/2 mx-auto mb-8 w-[70%] -translate-x-1/2 -translate-y-1/2 transform rounded-xl bg-yellow-p bg-opacity-85 p-8 text-justify text-blue-v md:w-[40%] lg:w-1/3">
        <h1 className="mb-4 text-center text-2xl font-bold">Règles du jeu</h1>
        {/* <h2 className="font-bold mb-4 text-center">Objectifs du jeu</h2> */}
        <p>
          Vous créez votre champion en choisissant un nom et un avatar puis
          votre métier pour obtenir des bonus.<br></br> En découvrant l'épreuve
          du jour vous sélectionnez un dieu à représenter pour bénéficier de
          bonus supplémentaires. <br></br> La chance de chaque champion et les
          conditions météorologiques du jour pourront peut être influencer sur
          les résultats ...
        </p>
        {/* <p>Les joueurs incarnent des personnages uniques qui choisissent un dieu pour obtenir des bonus et un métier pour des avantages. 
          <br></br>
        Ils s'affrontent dans une épreuve qui change chaque jour pour prouver leur puissance et leur stratégie</p> */}
      </div>
      <Link
        to="/"
        className="btn-primary fixed bottom-12 left-1/2 min-w-[220px] -translate-x-1/2 transform"
      >
        Retour accueil
      </Link>
    </main>
  );
}

export default RulesPage;
