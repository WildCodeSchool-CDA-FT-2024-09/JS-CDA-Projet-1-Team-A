import { Query, Resolver } from "type-graphql";
import { Profession } from "./profession.entity";

@Resolver(Profession)
export default class ProfessionResolver {
  @Query(() => [Profession])
  async getProfession() {
    const profession = await Profession.find();
    return profession;
  }
}
