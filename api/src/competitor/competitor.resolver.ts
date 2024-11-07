import { Query, Resolver } from "type-graphql";
import { Competitor } from "./competitor.entity";
import { IsNull } from "typeorm";

@Resolver(Competitor)
export default class CompetitorResolver {
  @Query(() => [Competitor])
  async getCompetitor() {
    const competitor = await Competitor.find();
    return competitor;
  }

  @Query(() => [Competitor])
  async competitorsWithoutImages(): Promise<Competitor[]> {
    return await Competitor.find({
      where: [{ avatarImage: IsNull() }, { battleImage: IsNull() }],
      relations: ["avatarImage", "battleImage", "god"],
    });
  }
}
