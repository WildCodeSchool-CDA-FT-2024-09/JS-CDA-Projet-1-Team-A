import { Link } from "react-router-dom";

function RulesPage() {
  return (
    <main>
      <article className="mt-38 fixed left-1/2 top-1/2 mx-auto mb-8 max-h-[55vh] w-[70%] -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-xl bg-yellow-p bg-opacity-85 p-8 text-justify text-blue-v md:w-[40%] lg:w-1/3">
        <h1 className="mb-4 text-center text-2xl font-bold">Règles du jeu</h1>
        <p>
          Vous créez votre champion en choisissant un nom et un avatar puis
          votre métier pour obtenir des bonus.
          <br /> En découvrant l'épreuve du jour vous sélectionnez un dieu à
          représenter pour bénéficier de bonus supplémentaires. <br /> La chance
          de chaque champion et les conditions météorologiques du jour pourront
          peut être influencer sur les résultats ...
        </p>
      </article>
      <Link
        to="/"
        aria-label="Retourner à la page d'accueil"
        className="btn-primary fixed bottom-20 left-1/2 min-w-[220px] -translate-x-1/2 transform"
      >
        Retour accueil
      </Link>
    </main>
  );
}

export default RulesPage;
