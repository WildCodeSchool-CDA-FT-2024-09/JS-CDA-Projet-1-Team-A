import { Query, Resolver } from "type-graphql";
import { Combat } from "./combat.entity";

@Resolver(Combat)
export default class CombatResolver {
  @Query(() => [Combat])
  async getCombat() {
    const combat = await Combat.find();
    return combat;
  }
}
