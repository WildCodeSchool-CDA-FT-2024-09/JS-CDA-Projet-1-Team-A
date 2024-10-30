function StartTrialPage() {
  return (
    <section className="fixed inset-0 h-screen w-full bg-blue-v/80 backdrop-blur-sm">
      <div className="relative flex h-full items-center justify-between md:items-end">
        {/* Avatar 1 - à gauche */}
        <img
          src="/img/competitors/battle/1.png"
          alt="Avatar de votre champion"
          className="absolute left-0 h-[45vh] w-auto -translate-x-28 translate-y-[-3rem] object-contain sm:translate-y-0 md:h-[70vh] md:-translate-x-0"
        />

        {/* Avatar 2 - à droite */}
        <img
          src="/img/competitors/battle/1.png"
          alt="Avatar de l'adversaire"
          className="absolute right-0 h-[45vh] w-auto translate-x-28 translate-y-[-3rem] scale-x-[-1] object-contain sm:translate-y-0 md:h-[70vh] md:translate-x-0"
        />
      </div>
    </section>
  );
}

export default StartTrialPage;
