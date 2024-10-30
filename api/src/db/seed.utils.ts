import { Modifier } from "../modifier/modifier.entity";
import { ModifierAssignment } from "../modifier_assignment/modifierAssignment.entity";

// MODIFIER ASSIGNMENTS - UTILITY TYPES & FUNCTION - GODS, TRIALS, PROFESSIONS
type EntityTypes = "god" | "profession" | "trial" | "competitor" | "combat";

// Modifier Assignment is the TypeORM entity with full realtions and IDs.
// Here in the raw data manipulation we need a type for modifier assignment without IDs, to apply to the return of the stat generation function.
type BaseModifierAssignment = {
  modifier: {
    label: string;
  };
  value: number;
  valueType: string;
};

// This type is used to represent the data structure of the entities we are seeding.
// NB We don't need to specify other params that can differ between entity datasets, Typescript doesn't care
type NamedEntityWithModifierAssignments = {
  name: string;
  modifierAssignments: BaseModifierAssignment[];
};
// This type is to represent the entities once they have been initially saved, but not yet had their relatinoal data added - we need this to map the modifier assignments to the correct entity IDs.
// NB We don't need to specify other params that can differ between entities, Typescript doesn't care
type NamedEntityWithIds = {
  id: string;
  name: string;
};

/**
 * Maps the modifier assignments for a given entity type to the correct entity IDs and saves them to the database.
 * @param entityData
 * @param entityDataWithIds
 * @param entityType
 * @returns An array of modifier assignments for the given entity type, with the correct entity IDs assigned.
 */
export async function mapAndSaveNamedEntityModifierAssignments(
  entityData: NamedEntityWithModifierAssignments[],
  entityDataWithIds: NamedEntityWithIds[],
  entityType: EntityTypes
): Promise<ModifierAssignment[]> {
  const modifiers = await Modifier.find();
  return Promise.all(
    entityData.flatMap((entity) =>
      entity.modifierAssignments.map(async (assignment) => {
        const modifier = modifiers.find(
          (modifier) => modifier.label === assignment.modifier.label
        );
        if (!modifier) {
          throw new Error(
            `Modifier with label ${assignment.modifier.label} not found`
          );
        }
        const newModifierAssignment = new ModifierAssignment();
        newModifierAssignment.modifier = modifier;
        newModifierAssignment.value = assignment.value;
        newModifierAssignment.valueType = assignment.valueType;
        newModifierAssignment.modifiedEntityId =
          entityDataWithIds.find((e) => e.name === entity.name)?.id ||
          "MISSING_ENTITY_ID";
        newModifierAssignment.modifiedEntityType = entityType;
        return await newModifierAssignment.save();
      })
    )
  );
}

// MODIFIER ASSIGNMENT GENERATION - COMPETITORS
/**
 * Creates stat modifier assignments for a player. The rather simple distribution algorithm tends towards a spread of high and low stats.
 * @param possiblePlayerModifiers An array of those modifiers that can be assigned to a player.
 * @param minStatValue The minimum value for each stat.
 * @param maxStatBonus The maximum bonus value that can be added to each stat.
 * @param totalStatsBonus The total sum of all stat values.
 * @returns An array of modifier assignments for a player, with stat values generated randomly across a defined stat total limit.
 */
export function makePlayerStatModifierAssigments(
  possiblePlayerModifiers: Modifier[],
  minStatValue = 4,
  maxStatBonus = 10,
  totalStatsBonus = 42
): BaseModifierAssignment[] {
  /**
   * Utility function to generate a random distribution of stat bonus values that always sum up to a given total.
   * @param sum The total sum of all stat values.
   * @param parts The number of parts to divide the sum into.
   * @param maxValue The maximum value for each part.
   * @returns An array of randomly ordered values that always add up to the given sum value.
   */
  function generateRandomArray(
    sum: number,
    parts: number,
    maxValue: number
  ): number[] {
    const values: number[] = [];
    let remaining = sum;

    for (let i = 0; i < parts; i++) {
      // Calculate min and max possible values for this part
      const minPossible = Math.max(0, remaining - maxValue * (parts - i - 1));
      const maxPossible = Math.min(maxValue, remaining);

      // Randomly select a value within the allowed range
      const value =
        Math.floor(Math.random() * (maxPossible - minPossible + 1)) +
        minPossible;

      values.push(value);
      remaining -= value;
    }

    // Shuffle the array to randomize the order
    for (let i = values.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [values[i], values[j]] = [values[j], values[i]];
    }

    return values;
  }

  const statDistribution = generateRandomArray(
    totalStatsBonus,
    possiblePlayerModifiers.length,
    maxStatBonus
  );

  const modifierAssignments: BaseModifierAssignment[] =
    possiblePlayerModifiers.map((modifier, index) => ({
      modifier: {
        label: modifier.label,
      },
      value: minStatValue + statDistribution[index],
      valueType: "stat",
    }));

  return modifierAssignments;
}
