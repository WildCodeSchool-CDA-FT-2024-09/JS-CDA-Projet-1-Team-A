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

  @Query(() => Combat, { nullable: true })
  async combat(@Arg("id") id: string): Promise<Combat | null> {
    const combat = await Combat.findOne({
      where: { id },
      relations: [
        "player",
        "player.avatarImage",
        "player.god",
        "player.god.image",
        "opponent",
        "opponent.avatarImage",
        "opponent.god",
        "opponent.god.image",
        "trial",
        "trial.image",
        "image",
      ],
    });
    console.info(JSON.stringify(combat, null, 2));
    return combat;
  }
}
