function HomePage() {
  return (
    <main className="w-3/4">
      <div className="bg-blue-200">
        <p className="mb-4">
          HOME PAGE Dans la grèce Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Explicabo tempora repellendus quae est laudantium
          quisquam amet vero autem deserunt ullam corporis hic maiores, illum
          quo. Iusto numquam veniam mollitia sint!
        </p>
        <div className="mb-4 flex w-full flex-row justify-center gap-4">
          <button>Règles</button>
          <button>Statistiques</button>
          <button>A propos</button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <button>Découvre ton épreuves</button>
        <button>Crée ton champion</button>
      </div>
    </main>
  );
}

export default HomePage;
