import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Combat, CombatResult } from "./combat.entity";
import { Competitor } from "../competitor/competitor.entity"; // Entité des joueurs
import { Trial } from "../trial/trial.entity"; // Entité de l'épreuve
import { God } from "../god/god.entity";
import { ModifierAssignment } from "../modifier_assignment/modifierAssignment.entity";
import { Modifier } from "../modifier/modifier.entity";

@Resolver(Combat)
export default class CombatResolver {
  @Query(() => [Combat])
  async combats() {
    const combat = Combat.find({
      relations: [
        "player",
        "opponent",
        "trial",
        "playerGod",
        "opponentGod",
        "modifierAssignments",
      ],
      order: { createdAt: "DESC" },
    });
    return combat;
  }

  @Query(() => CombatResult)
  async combatResult(@Arg("id") id: string) {
    const combat = await Combat.findOneOrFail({
      where: { id },
      relations: [
        "player.modifierAssignments",
        "player.profession.modifierAssignments",
        "opponent.modifierAssignments",
        "opponent.profession.modifierAssignments",
        "trial.modifierAssignments",
        "playerGod.modifierAssignments",
        "opponentGod.modifierAssignments",
        "modifierAssignments",
      ],
    });
    const combatResult = new CombatResult();
    combatResult.id = combat.id;
    const result: {
      modifiedTrial: { [key: string]: number };
      modifiedRelevantPlayer: { [key: string]: number };
      modifiedRelevantOpponent: { [key: string]: number };
      playerStatScores: { [key: string]: number };
      opponentStatScores: { [key: string]: number };
      finalScores: { player: number; opponent: number };
    } = {
      // The trial coefs adjusted by the day's modifiers
      modifiedTrial: {},
      // The player stats relevant to the trial plus the god and profession bonuses
      modifiedRelevantPlayer: {},
      // The opponent stats relevant to the trial plus the god and profession bonuses
      modifiedRelevantOpponent: {},
      // Player final scores for each stat
      playerStatScores: {},
      // Opponent final scores for each stat
      opponentStatScores: {},
      // The final result of the combat
      finalScores: {
        player: 0,
        opponent: 0,
      },
    };

    // Combat logic
    const { player, opponent, trial, playerGod, opponentGod } = combat;

    // Calculate the trial coefs for today
    trial.modifierAssignments?.forEach((tMa) => {
      const todayCoef =
        combat.modifierAssignments?.find(
          (cMa) => cMa.modifierLabel === tMa.modifierLabel
        )?.value || 0;
      result.modifiedTrial[tMa.modifierLabel] = Math.floor(
        tMa.value * (todayCoef / 100)
      );
    });

    // Calculate the trial-relevant stats + bonuses for each player
    trial.modifierAssignments?.forEach((tMa) => {
      const playerBaseStat = player.modifierAssignments?.find(
        (pMa) => pMa.modifierLabel === tMa.modifierLabel
      )?.value;
      const opponentBaseStat = opponent.modifierAssignments?.find(
        (oMa) => oMa.modifierLabel === tMa.modifierLabel
      )?.value;
      const playerGodBonus =
        playerGod.modifierAssignments?.find(
          (pGMa) => pGMa.modifierLabel === tMa.modifierLabel
        )?.value || 0;
      const opponentGodBonus =
        opponentGod.modifierAssignments?.find(
          (oGMa) => oGMa.modifierLabel === tMa.modifierLabel
        )?.value || 0;
      const playerProfessionBonus =
        player.profession.modifierAssignments?.find(
          (pPMa) => pPMa.modifierLabel === tMa.modifierLabel
        )?.value || 0;
      const opponentProfessionBonus =
        opponent.profession.modifierAssignments?.find(
          (oPMa) => oPMa.modifierLabel === tMa.modifierLabel
        )?.value || 0;
      result.modifiedRelevantPlayer[tMa.modifierLabel] =
        (playerBaseStat || 0) + playerGodBonus + playerProfessionBonus;
      result.modifiedRelevantOpponent[tMa.modifierLabel] =
        (opponentBaseStat || 0) + opponentGodBonus + opponentProfessionBonus;
    });

    // Calculate the per-stat score for each player
    Object.entries(result.modifiedTrial).forEach(([value, modifier]) => {
      result.playerStatScores[value] =
        result.modifiedRelevantPlayer[value] * modifier;
      result.opponentStatScores[value] =
        result.modifiedRelevantOpponent[value] * modifier;
    });

    // Calculate the final scores
    Object.values(result.playerStatScores).forEach((value) => {
      result.finalScores.player += value;
    });
    Object.values(result.opponentStatScores).forEach((value) => {
      result.finalScores.opponent += value;
    });

    combatResult.combatDetail = JSON.stringify(result);

    // Write long text for player win or lose
    if (result.finalScores.player > result.finalScores.opponent) {
      combatResult.resultLongText = `Avec le soutien du puissant(e) ${playerGod.name}, notre joueur ${player.name} le ${player.profession.name} est le champion victorieux avec un score de ${result.finalScores.player} !!! Leur adversaire, ${opponent.name} le ${opponent.profession.name}, n'a pu obtenir qu'un score de ${result.finalScores.opponent}, à la honte éternelle de leur dieu humilié(e), ${opponentGod.name}.`;
      combatResult.resultShortText = `Joueur : ${result.finalScores.player} vs Adversaire : ${result.finalScores.opponent} - ${player.name} gagne !`;
    } else if (result.finalScores.player < result.finalScores.opponent) {
      combatResult.resultLongText = `Malgré les efforts vaillants de ${player.name} le ${player.profession.name} et le soutien de ${playerGod.name}, notre joueur n'a pu obtenir qu'un score de ${result.finalScores.player} contre leur adversaire, ${opponent.name} le ${opponent.profession.name}, qui a obtenu un score de ${result.finalScores.opponent} et a été déclaré vainqueur, à la grande joie de leur dieu, ${opponentGod.name}.`;
      combatResult.resultShortText = `Joueur : ${result.finalScores.player} vs Adversaire : ${result.finalScores.opponent} - ${player.name} perd !`;
    } else {
      combatResult.resultLongText = `Incroyablement, c'est une égalité avec un score de ${result.finalScores.player} pour les deux courageux compétiteurs !`;
      combatResult.resultShortText = `Joueur : ${result.finalScores.player} vs Adversaire : ${result.finalScores.opponent} - ${player.name} et ${opponent.name} sont à égalité !`;
    }

    return combatResult;
  }

  @Query(() => Combat, { nullable: true })
  async combat(@Arg("id") id: string): Promise<Combat | null> {
    const combat = await Combat.findOne({
      where: { id },
      relations: [
        "player.image",
        "opponent.image",
        "trial.image",
        "playerGod.image",
        "opponentGod.image",
        "modifierAssignments",
      ],
    });
    return combat;
  }

  @Mutation(() => Combat)
  async createCombat(
    @Arg("playerId") playerId: string, // ID du joueur
    @Arg("opponentId") opponentId: string, // ID de l'adversaire
    @Arg("trialId") trialId: string, // ID de l'épreuve
    @Arg("playerGodId") playerGodId: string, // ID du dieu du joueur
    @Arg("opponentGodId") opponentGodId: string // ID du dieu de l'adversaire
  ): Promise<Combat> {
    // Récupérer les entités associées aux IDs passés en argument
    const player = await Competitor.findOneOrFail({ where: { id: playerId } });
    const opponent = await Competitor.findOneOrFail({
      where: { id: opponentId },
    });
    const trial = await Trial.findOneOrFail({ where: { id: trialId } });
    const playerGod = await God.findOneOrFail({ where: { id: playerGodId } });
    const opponentGod = await God.findOneOrFail({
      where: { id: opponentGodId },
    });

    // Créer un combat
    const newCombat = new Combat();
    newCombat.resultShortText = "A short combat result"; // Résultat court
    newCombat.resultLongText = "A long combat result"; // Résultat long

    // Assigner les entités récupérées au combat
    newCombat.player = player;
    newCombat.opponent = opponent;
    newCombat.trial = trial;
    newCombat.playerGod = playerGod;
    newCombat.opponentGod = opponentGod;

    // Sauvegarder le combat
    const savedCombat = await newCombat.save();

    // -- Assignation des modificateurs pour ce combat --

    // Récupérer tous les modificateurs
    const modifiers = await Modifier.find();

    // Assigner des modificateurs pour ce combat
    const savedCombatModifierAssignments = await Promise.all(
      modifiers.map(async (modifier) => {
        const newModifierAssignment = new ModifierAssignment();
        newModifierAssignment.modifier = modifier;

        // Assigner une valeur aléatoire entre 70 et 130
        newModifierAssignment.value = Math.ceil(Math.random() * 60) + 70;
        newModifierAssignment.valueType = "coef";
        newModifierAssignment.modifiedEntityId = savedCombat.id;
        newModifierAssignment.modifiedEntityType = "combat";

        // Sauvegarder l'assignation
        return await newModifierAssignment.save();
      })
    );
    console.info(savedCombatModifierAssignments);

    // -- Retourner le combat créé --
    return savedCombat;
  }
}
