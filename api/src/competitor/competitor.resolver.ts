import { Query, Resolver } from "type-graphql";
import { Competitor } from "./competitor.entity";

@Resolver(Competitor)
export default class GodResolver {
  @Query(() => [Competitor])
  async getCompetitor() {
    const competitor = await Competitor.find();
    return competitor;
  }
}
