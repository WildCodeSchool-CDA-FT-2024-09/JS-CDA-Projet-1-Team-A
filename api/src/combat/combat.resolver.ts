import { Query, Resolver, Arg } from "type-graphql";
import { Combat } from "./combat.entity";

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

  // de la par de mon cousin
  // Nouvelle requête pour récupérer un combat spécifique avec des relations supplémentaires
  @Query(() => Combat, { nullable: true })
  async combat(@Arg("id") id: string) {
    const combat = await Combat.findOne({
      where: { id },
      relations: [
        "player",
        "player.god",
        "player.avatarImage", // Image de l'avatar du joueur
        "opponent",
        "opponent.god",
        "opponent.avatarImage", // Image de l'avatar de l'opposant
        "playerGod.image", // Image du dieu du joueur
        "opponentGod.image", // Image du dieu de l'opposant
        "trial",
        "trial.image", // Image de l'épreuve
        "modifierAssignments",
      ],
    });
    return combat;
  }
}
