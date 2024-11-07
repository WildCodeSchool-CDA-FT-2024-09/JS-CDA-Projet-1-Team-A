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
        "player.image",
        "opponent.image",
        "trial.image",
        "playerGod.image",
        "opponentGod.image",
        "modifierAssignments",
      ],

      // relations: {
      //   player: { image: true },
      //   opponent: { image: true },
      //   trial: { image: true },
      //   playerGod: { image: true },
      //   opponentGod: { image: true },
      //   modifierAssignments: true,
      // },
    });
    return combat;
  }
}
