import { Competitor } from "../competitor/competitor.entity";

export const findModifierValue = (
  assignments: { modifierLabel: string; value: number }[],
  label: string
): number => {
  return (
    assignments.find((assignment) => assignment.modifierLabel === label)
      ?.value || 0
  );
};

export function generateCombatText(
  player: Competitor,
  playerGod: { name: string },
  opponent: Competitor,
  opponentGod: { name: string },
  result: { finalScores: { player: number; opponent: number } }
): { longText: string; shortText: string } {
  if (result.finalScores.player > result.finalScores.opponent) {
    return {
      longText: `Avec le soutien du puissant(e) ${playerGod.name}, notre joueur ${player.name} le ${player.profession.name} est le champion victorieux avec un score de ${result.finalScores.player} !!! Leur adversaire, ${opponent.name} le ${opponent.profession.name}, n'a pu obtenir qu'un score de ${result.finalScores.opponent}, à la honte éternelle de leur dieu humilié(e), ${opponentGod.name}.`,
      shortText: `Joueur : ${result.finalScores.player} vs Adversaire : ${result.finalScores.opponent} - ${player.name} gagne !`,
    };
  } else if (result.finalScores.player < result.finalScores.opponent) {
    return {
      longText: `Malgré les efforts vaillants de ${player.name} le ${player.profession.name} et le soutien de ${playerGod.name}, notre joueur n'a pu obtenir qu'un score de ${result.finalScores.player} contre leur adversaire, ${opponent.name} le ${opponent.profession.name}, qui a obtenu un score de ${result.finalScores.opponent} et a été déclaré vainqueur, à la grande joie de leur dieu, ${opponentGod.name}.`,
      shortText: `Joueur : ${result.finalScores.player} vs Adversaire : ${result.finalScores.opponent} - ${player.name} perd !`,
    };
  } else {
    return {
      longText: `Incroyablement, c'est une égalité avec un score de ${result.finalScores.player} pour les deux courageux compétiteurs !`,
      shortText: `Joueur : ${result.finalScores.player} vs Adversaire : ${result.finalScores.opponent} - ${player.name} et ${opponent.name} sont à égalité !`,
    };
  }
}
