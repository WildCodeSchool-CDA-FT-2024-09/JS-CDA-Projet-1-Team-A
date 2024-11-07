import { Query, Resolver } from "type-graphql";
import { Trial } from "./trial.entity";

@Resolver(Trial)
export default class TrialResolver {
  @Query(() => [Trial])
  async getTrial() {
    const trial = await Trial.find({
      relations: ["image"],
    });
    return trial;
  }
}
