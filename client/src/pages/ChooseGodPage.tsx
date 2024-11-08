import { useContext } from "react";
import { Link } from "react-router-dom";
import { CharacterContext } from "../contexts/CharacterContext";
import AvatarCarouselWrapper from "../components/CarouselWrapper";
import { useGetGodimageQuery } from "../generated/graphql-types";
import { useGetTrialQuery } from "../generated/graphql-types";
interface Trial {
  name: string;
  description: string;
  imagePath: string;
}

function trialRandom(trials: Trial[]) {
  const randomIndex = Math.floor(Math.random() * trials.length);
  return trials[randomIndex];
}

function ChooseGodPage() {
  const { character } = useContext(CharacterContext);
  const { data, loading, error } = useGetGodimageQuery();
  const {
    data: dataTrial,
    loading: loadingTrial,
    error: errorTrial,
  } = useGetTrialQuery();

  const trial =
    dataTrial?.getTrial.map((trial) => ({
      name: trial.name,
      description: trial.description,
      imagePath: trial.image?.path || "",
    })) || [];

  const selectedTrial = trial.length > 0 ? trialRandom(trial) : null;

  if (loading || loadingTrial) return <p>Chargement des images...</p>;
  if (error || errorTrial) return <p>Erreur lors du chargement des images</p>;

  return (
    <div className="inset-0 flex h-screen w-full flex-col bg-black/50 backdrop-blur-sm">
      <h1 className="mt-5 text-xl font-bold">Champion {character.name}</h1>
      <section className="m-6 rounded-lg bg-blue-fd bg-opacity-85 p-2 shadow-md">
        <ul>
          <h2 className="mb-4 text-xl font-bold">Voici ton épreuve</h2>
          {selectedTrial ? (
            <li>
              <h3 className="m-2 text-lg font-bold">{selectedTrial.name}</h3>
              <section className="row flex">
                <img
                  className="w-2/5"
                  src={selectedTrial.imagePath}
                  alt={selectedTrial.name}
                />
                <p>{selectedTrial.description}</p>
              </section>
            </li>
          ) : (
            <p>Aucune épreuve disponible pour le moment.</p>
          )}
        </ul>
      </section>
      <section>
        <AvatarCarouselWrapper
          imageUrls={
            data?.getGod.map((god) => ({
              url: god.image?.path || "",
            })) || []
          }
          myTitle="Choisissez votre Dieu"
        />
      </section>
      <Link
        to="/epreuve"
        aria-label="Commencer le jeu"
        className="btn-primary mx-40 min-w-[220px] md:mr-24"
      >
        Démarre l'épreuve!
      </Link>
    </div>
  );
}

export default ChooseGodPage;
