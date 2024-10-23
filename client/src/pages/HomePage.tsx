import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main className="mt-48 w-2/3 lg:mt-0">
      <div className="mb-4 rounded-xl bg-blue-fd bg-opacity-85 p-8">
        <p className="mb-4 text-xl">
          Dans la Grèce antique, les jeux étaient très populaires.
        </p>
        <p className="mb-4 text-xl">
          Prépare toi à combattre nos champions de la Grèce antique.
        </p>
        <div className="mb-4 flex w-full flex-col items-center gap-6 lg:flex-row lg:justify-center">
          <Link to="/Rules" className="btn-primary min-w-[220px]">
            Règles
          </Link>
          {/* <button className="btn-primary min-w-[220px]">Statistiques</button>
          <button className="btn-primary min-w-[220px]">A propos</button> */}
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-4">
        {/* <button className="btn-primary min-w-[220px]">
          Découvre ton épreuve
        </button> */}
        <button className="btn-primary min-w-[220px]">Crée ton champion</button>
      </div>
    </main>
  );
}

export default HomePage;
