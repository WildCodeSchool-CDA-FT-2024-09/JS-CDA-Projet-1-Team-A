import { Query, Resolver } from "type-graphql";
import { God } from "./god.entity";
import { ModifierAssignment } from "../modifier_assignment/modifierAssignment.entity";

@Resolver(God)
export default class GodResolver {
  @Query(() => [God])
  async getGods() {
    const gods = await God.find();

    const modifierAssignments = await ModifierAssignment.find({
      relations: { modifier: true },
      where: { modifiedEntityType: "god" },
    });

    // Map modifier assignments to their corresponding gods
    const godMap: Record<string, God> = gods.reduce(
      (map, god) => {
        map[god.id] = god;
        return map;
      },
      {} as Record<string, God>
    );

    modifierAssignments.forEach((modifier) => {
      const god = godMap[modifier.modifiedEntityId];
      if (god) {
        // Ensure modifierAssignments is initialized as an array
        god.modifierAssignments = god.modifierAssignments || [];
        god.modifierAssignments.push(modifier);
      }
    });

    return gods;
  }
}
