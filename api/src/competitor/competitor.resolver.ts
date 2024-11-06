import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Competitor, TemporaryCompetitor } from "./competitor.entity";
import { Modifier } from "../modifier/modifier.entity";
import { ModifierAssignment } from "../modifier_assignment/modifierAssignment.entity";
import { makePlayerStatModifierAssigments } from "../db/seed.utils";

@Resolver(Competitor)
export default class CompetitorResolver {
  @Query(() => [Competitor])
  async competitors() {
    const competitor = await Competitor.find({
      relations: ["profession", "avatarImage", "image", "modifierAssignments"],
      order: { createdAt: "DESC" },
    });
    return competitor;
  }

  @Query(() => Competitor)
  async competitor(@Arg("id") id: string) {
    const competitor = await Competitor.findOneOrFail({
      where: { id },
      relations: ["profession", "avatarImage", "image", "modifierAssignments"],
    });
    return competitor;
  }

  @Mutation(() => TemporaryCompetitor)
  async createTemporaryCompetitor() {
    // First we need to create the competitor to get a uuid
    const placeholderNames = [
      "Hélène",
      "Adrianos",
      "Ioulianos",
      "Thomaios",
      "Petros",
    ];
    const tempCompetitor = new TemporaryCompetitor();
    tempCompetitor.name =
      placeholderNames[Math.floor(Math.random() * placeholderNames.length)];
    tempCompetitor.status = "temporary";

    // NOTE - we have to save using the base class as TemporaryCompetitor isn't a full entity
    const savedCompetitor = await Competitor.save(tempCompetitor);

    // Then we need to generate the modifier assignments
    const modifiers = await Modifier.find();
    const modifierAssignments = makePlayerStatModifierAssigments(
      modifiers,
      4,
      10,
      42
    );

    // Then we need to save the modifier assignments
    await Promise.all(
      modifiers.map(async (modifier) => {
        const newModifierAssignment = new ModifierAssignment();
        newModifierAssignment.modifier = modifier;
        newModifierAssignment.value = modifierAssignments.find(
          (assignment) => assignment.modifier.label === modifier.label
        )?.value as number;
        newModifierAssignment.valueType = "stat";
        newModifierAssignment.modifiedEntityId = savedCompetitor.id;
        newModifierAssignment.modifiedEntityType = "competitor";
        return await newModifierAssignment.save();
      })
    );

    // Finally we return the saved competitor
    const competitorWithModifiers = (await Competitor.findOne({
      where: { id: savedCompetitor.id },
      relations: ["modifierAssignments"],
    })) as TemporaryCompetitor;

    return competitorWithModifiers;
  }

  @Mutation(() => Boolean)
  async deleteTemporaryCompetitor(@Arg("id") id: string) {
    // Check competitor exists and is temporary
    const competitor = await Competitor.findOne({
      where: { id },
    });
    if (!competitor || competitor.status !== "temporary") {
      return false;
    }

    await Competitor.delete(id);
    await ModifierAssignment.delete({ modifiedEntityId: id });
    return true;
  }
}
