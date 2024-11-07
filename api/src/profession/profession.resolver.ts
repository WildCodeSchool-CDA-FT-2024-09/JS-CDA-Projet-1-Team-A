import { Query, Resolver } from "type-graphql";
import { Profession } from "./profession.entity";

@Resolver(Profession)
export default class ProfessionResolver {
  @Query(() => [Profession])
  async professions() {
    const profession = await Profession.find({
      relations: ["modifierAssignments", "image"],
    });
    return profession;
  }
}
