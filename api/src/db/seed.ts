import { appDataSource as dataSource } from "./db-client";

import { Combat } from "../combat/combat.entity";
import { Competitor } from "../competitor/competitor.entity";
import competitorData from "./seed-data/competitor.json";
import { God } from "../god/god.entity";
import godData from "./seed-data/god.json";
import { Modifier } from "../modifier/modifier.entity";
import modifierData from "./seed-data/modifier.json";
import { Profession } from "../profession/profession.entity";
import professionData from "./seed-data/profession.json";
import { Trial } from "../trial/trial.entity";
import trialData from "./seed-data/trial.json";
import { Image } from "../image/image.entity";
import { ModifierAssignment } from "../modifier_assignment/modifierAssignment.entity";
import imageData from "./seed-data/image.json";
import {
  makePlayerStatModifierAssigments,
  mapAndSaveNamedEntityModifierAssignments,
} from "./seed.utils";

(async () => {
  // INIT DATA SOURCE --
  await dataSource.initialize();
  const queryRunner = dataSource.createQueryRunner();
  console.info("Data Source initialized");

  try {
    // -- CLEAR DATABASE --
    await queryRunner.startTransaction();
    await queryRunner.query("DELETE FROM combat");
    await queryRunner.query("DELETE FROM competitor");
    await queryRunner.query("DELETE FROM god");
    await queryRunner.query("DELETE FROM modifier_assignment");
    await queryRunner.query("DELETE FROM profession");
    await queryRunner.query("DELETE FROM trial");
    await queryRunner.query("DELETE FROM image");
    await queryRunner.query("DELETE FROM modifier");

    // -- DELETE SEQUENCES --
    await queryRunner.query(
      "DELETE FROM sqlite_sequence WHERE name = 'modifier_assignment' OR name = 'image'"
    );

    // -- SEED BASE ENTITY DATA --
    // SEED IMAGES
    // Map image targets to image entities for later use with unique named entities (gods, professions, trials)
    // Map image paths to image entities for later use with competitors
    const imageIdMap = new Map<string, Image>();
    const imagePathMap = new Map<string, Image>();
    const savedImages = await Promise.all(
      imageData.map(async (image) => {
        const newImage = new Image();
        newImage.type = image.type;
        newImage.path = image.path;
        const newImageSaved = await newImage.save();
        imageIdMap.set(image.target_entity, newImageSaved);
        imagePathMap.set(image.path, newImageSaved);
        return newImageSaved;
      })
    );

    // TOIMPROVE - interesting exercise - write a generic function for seeding unique named entities (profession, trials, gods)

    // SEED GODS
    const savedGods = await Promise.all(
      godData.map(async (god) => {
        const newGod = new God();
        newGod.name = god.name;
        newGod.description = god.description;
        newGod.image = imageIdMap.get(god.name) as Image;
        return await newGod.save();
      })
    );

    // SEED PROFESSIONS
    const savedProfessions = await Promise.all(
      professionData.map(async (profession) => {
        const newProfession = new Profession();
        newProfession.name = profession.name;
        newProfession.description = profession.description;
        newProfession.image = imageIdMap.get(profession.name) as Image;
        return await newProfession.save();
      })
    );

    // SEED TRIALS
    const savedTrials = await Promise.all(
      trialData.map(async (trial) => {
        const newTrial = new Trial();
        newTrial.name = trial.name;
        newTrial.description = trial.description;
        newTrial.image = imageIdMap.get(trial.name) as Image;
        return await newTrial.save();
      })
    );

    // SEED COMPETITORS
    // Competitor images are not unique to one competitor
    // We add an image chosen randomly from those that exist using the image pathMap
    const savedCompetitors = await Promise.all(
      competitorData.map(async (competitor) => {
        // NB - 3 is the current number of player image sets defined in the seed data
        // We can map to these because the player images have a fixed path structure and naming convention 1.png, 2.png, 3.png etc.
        const competitorImageChoice = Math.ceil(Math.random() * 3);
        const competitorProfessionChoice = Math.floor(
          Math.random() * savedProfessions.length
        );
        const newCompetitor = new Competitor();
        newCompetitor.name = competitor.name;
        newCompetitor.status = competitor.status;
        newCompetitor.profession = savedProfessions[competitorProfessionChoice];
        newCompetitor.avatarImage = imagePathMap.get(
          `/img/competitors/avatars/${competitorImageChoice}.png`
        ) as Image;
        newCompetitor.image = imagePathMap.get(
          `/img/competitors/battle/${competitorImageChoice}.png`
        ) as Image;
        return await newCompetitor.save();
      })
    );

    // SEED MODIFIERS
    const savedModifiers = await Promise.all(
      modifierData.map(async (modifier) => {
        const newModifier = new Modifier();
        newModifier.label = modifier.label;
        return await newModifier.save();
      })
    );

    // -- SEED MODIFIER ASSIGNMENT RELATIONSHIPS --
    // This has to be done as a second step so that we have the UUIDs of the newly created entities available

    const savedGodModifierAssignments =
      await mapAndSaveNamedEntityModifierAssignments(godData, savedGods, "god");

    const savedProfessionModifierAssignments =
      await mapAndSaveNamedEntityModifierAssignments(
        professionData,
        savedProfessions,
        "profession"
      );

    const savedTrialModifierAssignments =
      await mapAndSaveNamedEntityModifierAssignments(
        trialData,
        savedTrials,
        "trial"
      );

    // Competitiors need a generated distribution of stat modifiers
    const modifiers = await Modifier.find();
    const competitorsWithModifierAssignments = competitorData.map(
      (competitor) => {
        const modifierAssignments = makePlayerStatModifierAssigments(
          modifiers,
          4,
          10,
          42
        );
        return {
          name: competitor.name,
          modifierAssignments: modifierAssignments,
        };
      }
    );

    const savedCompetitorModifierAssignments =
      await mapAndSaveNamedEntityModifierAssignments(
        competitorsWithModifierAssignments,
        savedCompetitors,
        "competitor"
      );

    // -- SEED BASE COMBAT DATA --
    // Currently one combat for each default seeded competitor
    const savedCombats = await Promise.all(
      savedCompetitors.map(async (competitor) => {
        const newCombat = new Combat();
        newCombat.resultShortText = "A short combat result";
        newCombat.resultLongText = "A long combat result";
        newCombat.playerGod =
          savedGods[Math.floor(Math.random() * savedGods.length)];
        newCombat.opponentGod =
          savedGods[Math.floor(Math.random() * savedGods.length)];
        newCombat.player = competitor;
        // Need to ensure the opponent is not the same as the player
        do {
          newCombat.opponent =
            savedCompetitors[
              Math.floor(Math.random() * savedCompetitors.length)
            ];
        } while (newCombat.opponent.id === competitor.id);
        newCombat.trial =
          savedTrials[Math.floor(Math.random() * savedTrials.length)];
        return await newCombat.save();
      })
    );

    // -- SEED MODIFIER ASSIGNMENT RELATIONSHIPS FOR COMBATS --
    // This has to be done as a second step so that we have the UUIDs of the newly created combats available
    const savedCombatModifierAssignments = await Promise.all(
      savedCombats.flatMap((combat) =>
        modifiers.map(async (modifier) => {
          const newModifierAssignment = new ModifierAssignment();
          newModifierAssignment.modifier = modifier;
          // Value should be a random value between 70 and 130 inclusive
          newModifierAssignment.value = Math.ceil(Math.random() * 60) + 70;
          newModifierAssignment.valueType = "coef";
          newModifierAssignment.modifiedEntityId = combat.id;
          newModifierAssignment.modifiedEntityType = "combat";
          return await newModifierAssignment.save();
        })
      )
    );

    // COMMIT!
    await queryRunner.commitTransaction();
    console.info(
      `Database seeded with ${savedGods.length} gods, ${savedProfessions.length} professions, ${savedModifiers.length} modifiers, ${savedGodModifierAssignments.length} god modifier assignments, ${savedProfessionModifierAssignments.length} profession modifier assignments, ${savedTrials.length} trials, ${savedCompetitors.length} competitors, ${savedImages.length} images, ${savedTrialModifierAssignments.length} trial modifier assignments, ${savedCompetitorModifierAssignments.length} competitor modifier assignments, ${savedCombats.length} combats, ${savedCombatModifierAssignments.length} combat modifier assignments`
    );
  } catch (error) {
    console.info("Error seeding DB", error);
    await queryRunner.rollbackTransaction();
  }
})();
