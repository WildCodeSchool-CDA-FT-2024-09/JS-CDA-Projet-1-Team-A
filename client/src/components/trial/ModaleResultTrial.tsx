interface ModaleResultTrialProps {
  result: boolean;
  resultTrial: { status: string };
}

export default function ModaleResultTrial({
  result,
  resultTrial,
}: ModaleResultTrialProps) {
  return (
    <div className="flex w-full flex-col items-center">
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
          className={`w-44 rounded-xl ${resultTrial.status === "VICTOIRE" ? "" : "saturate-0"}`}
        />

        {/*affiche la modale quand le state result passe a true*/}
        {resultTrial.status === "VICTOIRE" ? (
          <>
            <img
              src="/img/item/cup.png"
              alt="coupe de la victoire"
              className="absolute mt-36 w-48"
            />
            <img
              src="/img/item/confetti.png"
              alt="confettis de la victoire"
              className="absolute mt-0 w-fit"
            />
          </>
        ) : null}

        <h2 className="mb-28 text-3xl font-bold">{resultTrial.status}</h2>
      </section>
    </div>
  );
}
