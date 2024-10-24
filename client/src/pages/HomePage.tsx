import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main className="w-full">
      <div className="overflow-y-autofixed fixed left-1/2 top-1/2 flex max-h-[60vh] -translate-x-1/2 -translate-y-1/3 transform flex-col items-center gap-6 overflow-y-auto rounded-xl bg-blue-fd bg-opacity-85 p-8 md:w-[40%] lg:mt-8">
        <Link
          to="/"
          aria-label="Create your champion"
          className="btn-primary min-w-[220px]"
        >
          Crée ton Champion
        </Link>
        <Link
          to="/"
          aria-label="Read game statistics"
          className="btn-primary min-w-[220px]"
        >
          Statistiques
        </Link>
        <Link
          to="/"
          aria-label="Rules of the game"
          className="btn-primary min-w-[220px]"
        >
          Règles
        </Link>
        <Link
          to="/"
          aria-label="About Us"
          className="btn-primary min-w-[220px]"
        >
          A propos
        </Link>
      </div>
    </main>
  );
}

export default HomePage;
