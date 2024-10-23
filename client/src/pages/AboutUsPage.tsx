import { Link } from "react-router-dom";

function AboutUsPage() {
  return (
    <main>
      <div className="mt-38 text-justif mx-auto mb-8 w-2/3 rounded-xl bg-yellow-p bg-opacity-85 p-6 lg:w-1/3">
        <h1 className="mb-4 text-center text-2xl font-bold">Nous connaitre</h1>
        {/* <h2 className="font-bold mb-4 text-center">Objectifs du jeu</h2> */}

        <div className="text-black">
          <div className="mb-4">
            <h2 className="mb-1 font-bold">
              Bienvenue dans l’arène des dieux !
            </h2>
            <p className="text-justify">
              Dans notre jeu, plonge dans l'univers mythologique de la Grèce
              antique où les plus grands héros et guerriers s'affrontent pour
              prouver leur valeur aux dieux de l'Olympe. Chaque combattant
              incarne un dieu grec, avec des pouvoirs et des capacités uniques,
              prêt à relever des défis épiques.
            </p>
          </div>
          <div className="mb-4">
            <h2 className="mb-1 font-bold">L'histoire</h2>
            <p className="text-justify">
              Les dieux ont décidé d'organiser une série d'épreuves pour
              déterminer qui, parmi les mortels, est digne de leur faveur. En
              tant que joueur, tu choisis ton dieu protecteur et te lances dans
              l’arène, pour triompher et prendre place dans la légende.
              Prépare-toi à subir des preuves dans une bataille légendaire où la
              stratégie, le courage et la force des dieux seront tes plus grands
              atouts. Que les dieux te soient favorables !
            </p>
          </div>
        </div>

        <div className="mb-4 font-bold text-blue-v">
          <h2 className="mb-2 mt-4 text-xl">L'équipe Reactaulos</h2>
          <p>Hélène</p>
          <p>Adrien</p>
          <p>Pierre</p>
          <p>Tom</p>
          <p>Julien</p>
        </div>

        <p className="break-words font-medium text-blue-v">
          {" "}
          https://github.com/WildCodeSchool-CDA-FT-2024-09/JS-CDA-Projet-1-Team-A
        </p>
      </div>
      <Link to="/" className="btn-primary min-w-[220px]">
        Retour accueil
      </Link>
    </main>
  );
}

export default AboutUsPage;
