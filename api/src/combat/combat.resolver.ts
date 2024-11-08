import { Arg, Query, Resolver } from "type-graphql";
import { Combat, CombatResult } from "./combat.entity";
import { findModifierValue, generateCombatText } from "./combat.utils";

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
      const playerBaseStat = findModifierValue(
        player.modifierAssignments || [],
        tMa.modifierLabel
      );
      const opponentBaseStat = findModifierValue(
        opponent.modifierAssignments || [],
        tMa.modifierLabel
      );
      const playerGodBonus = findModifierValue(
        playerGod.modifierAssignments || [],
        tMa.modifierLabel
      );
      const opponentGodBonus = findModifierValue(
        opponentGod.modifierAssignments || [],
        tMa.modifierLabel
      );
      const playerProfessionBonus = findModifierValue(
        player.profession.modifierAssignments || [],
        tMa.modifierLabel
      );
      const opponentProfessionBonus = findModifierValue(
        opponent.profession.modifierAssignments || [],
        tMa.modifierLabel
      );

      result.modifiedRelevantPlayer[tMa.modifierLabel] =
        playerBaseStat + playerGodBonus + playerProfessionBonus;

      result.modifiedRelevantOpponent[tMa.modifierLabel] =
        opponentBaseStat + opponentGodBonus + opponentProfessionBonus;
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

    // Write text for player win or lose
    const { longText, shortText } = generateCombatText(
      player,
      playerGod,
      opponent,
      opponentGod,
      result
    );

    combatResult.resultLongText = longText;
    combatResult.resultShortText = shortText;

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
}
