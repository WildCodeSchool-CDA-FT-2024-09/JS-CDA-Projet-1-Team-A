import { Query, Resolver } from "type-graphql";
import { God } from "./god.entity";

@Resolver(God)
export default class GodResolver {
  @Query(() => [God])
  async getGod() {
    const god = await God.find({
      relations: ["image", "playerGodCombats"],
    });
    return god;
  }
}
