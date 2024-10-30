import { Link } from "react-router-dom";

function StatisticsPage() {
  return (
    <main>
      <div className="mt-38 text-justif fixed left-1/2 top-1/2 mx-auto mb-8 max-h-[55vh] w-[70%] -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-xl bg-yellow-p bg-opacity-85 p-6 md:w-[40%] lg:w-1/3">
        <h1 className="mb-4 text-center text-2xl font-bold text-blue-v">
          Statistiques
        </h1>

        <section className="text-blue-v">
          <article className="mb-4">
            <h2 className="mb-1 font-bold">Achilles vs. Hector</h2>
            <p className="text-justify">TODO - combat overview</p>
          </article>
        </section>
      </div>
      <Link
        to="/"
        aria-label="Retourner à la page d'accueil"
        className="btn-primary fixed bottom-16 left-1/2 min-w-[220px] -translate-x-1/2 transform"
      >
        Retour accueil
      </Link>
    </main>
  );
}

export default StatisticsPage;
