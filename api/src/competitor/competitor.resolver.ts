import { Arg, Mutation, Query, Resolver, InputType, Field } from "type-graphql";
import { Competitor } from "./competitor.entity";
import { Modifier } from "../modifier/modifier.entity";
import { ModifierAssignment } from "../modifier_assignment/modifierAssignment.entity";
import { Profession } from "./../profession/profession.entity";
import { IsString } from "class-validator";
import { validateOrReject } from "class-validator";

@InputType()
export class ModifierInput {
  @Field()
  id: number;

  @Field()
  @IsString()
  label: string;
}

@InputType()
export class ModifierAssignmentInput {
  @Field()
  modifierId: number;

  @Field()
  value: number;
}

@Resolver(Competitor)
export default class CompetitorResolver {
  @Query(() => [Competitor])
  async getCompetitor() {
    const competitor = await Competitor.find();
    return competitor;
  }

  @Query(() => [Competitor]) // Requête pour récupérer les compétiteurs
  async getCompetitorsByStatus(
    @Arg("status") status: string
  ): Promise<Competitor[]> {
    return Competitor.find({
      where: { status },
      relations: ["modifierAssignments"],
    });
  }

  @Mutation(() => Boolean)
  async createModifier(
    @Arg("data") data: ModifierInput // Argument de type ModifierInput
  ): Promise<boolean> {
    // Validation des données d'entrée
    try {
      await validateOrReject(data); // Cela valide uniquement le champ 'label'
    } catch (errors) {
      throw new Error("Erreur de validation : " + errors);
    }
    return true;
  }

  // Méthode pour finaliser un compétiteur
  @Mutation(() => Competitor)
  async finalizeCompetitor(
    @Arg("name") name: string,
    @Arg("professionId") professionId: string,
    @Arg("modifierAssignments", () => [ModifierAssignmentInput], {
      nullable: true,
    })
    modifierAssignmentsInput?: ModifierAssignmentInput[]
  ): Promise<Competitor> {
    // Rechercher un compétiteur temporaire
    const competitor = await Competitor.findOne({
      where: { status: "temporary" },
      relations: ["modifierAssignments"],
    });

    if (!competitor) {
      throw new Error(
        "Aucun compétiteur temporaire trouvé. Impossible de finaliser le compétiteur."
      );
    }
    console.info("Competitor found:", competitor);

    // Mettre à jour le nom et la profession
    competitor.name = name;

    // Associer la profession
    const profession = await Profession.findOneOrFail({
      where: { id: professionId },
    });
    competitor.profession = profession;

    // Gérer les modificateurs
    if (modifierAssignmentsInput) {
      competitor.modifierAssignments = await Promise.all(
        modifierAssignmentsInput.map(async (modifierInput) => {
          const assignment = new ModifierAssignment();

          const modifier = await Modifier.findOne({
            where: { id: modifierInput.modifierId },
          });

          if (!modifier) {
            throw new Error(
              `Modifier avec ID ${modifierInput.modifierId} introuvable.`
            );
          }
          assignment.modifier = modifier;
          assignment.value = modifierInput.value;
          assignment.modifiedEntityId = competitor.id;

          // Sauvegarder chaque ModifierAssignment individuellement
          await assignment.save();
          return assignment;
        })
      );
    }

    competitor.status = "actif";
    await competitor.save();
    return competitor;
  }
}
