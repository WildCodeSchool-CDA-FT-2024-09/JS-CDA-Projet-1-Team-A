interface ModaleResultTrialProps {
  result: string;
}

export default function ModaleResultTrial({ result }: ModaleResultTrialProps) {
  return (
    <div className="fixed inset-0 top-[170px] z-10 flex w-full flex-col items-center">
      <section
        className={
          result
            ? "relative flex h-[62vh] max-h-[62vh] w-[65vw] min-w-[280px] max-w-[700px] flex-col items-center justify-between rounded-xl bg-blue-fd bg-opacity-85 py-10"
            : "hidden"
        }
      >
        <img
          src="./img/competitors/avatars/avatar.png"
          alt="avatar du joueur"
          className={`w-44 rounded-xl ${result === "VICTOIRE" ? "" : "saturate-0"}`}
        />
        {/*affiche la modale quand le state result passe a true*/}
        {result === "VICTOIRE" ? (
          <section className="absolute flex h-[100%] justify-center align-baseline">
            <img
              src="/img/item/confetti.png"
              alt="confettis de la victoire"
              className="h-2/6 flex-initial md:h-3/6"
            />
            <img
              src="/img/item/cup.png"
              alt="coupe de la victoire"
              className="xl:top-1/5 md:w-46 absolute bottom-1/3 w-60 xl:w-60"
            />
          </section>
        ) : null}
        <h2 className="mb-20 text-3xl font-bold">{result}</h2>
      </section>
    </div>
  );
}
