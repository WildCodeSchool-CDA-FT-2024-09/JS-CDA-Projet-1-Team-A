interface ModaleResultTrialProps {
  result: boolean;
}

export default function ModaleResultTrial({ result }: ModaleResultTrialProps) {
  return (
    <div className="flex w-full flex-col items-center">
      <section
        className={
          result
            ? "flex h-[80vw] max-h-[80vw] w-[80vw] min-w-[280px] flex-col items-center justify-center rounded-xl bg-blue-fd bg-opacity-85 md:justify-evenly"
            : "hidden"
        }
      >
        {/*affiche la modale quand le state result passe a true*/}
        <h2>ici le resulta du combat</h2>
      </section>
    </div>
  );
}
