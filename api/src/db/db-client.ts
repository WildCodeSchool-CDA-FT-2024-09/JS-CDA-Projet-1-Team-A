import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { God } from "../god/god.entity";
import { GodWithModifiers } from "../god/godWithModifiersView.entity";
import {
  Competitor,
  CompetitorModifiers,
  TemporaryCompetitor,
} from "../competitor/competitor.entity";
import { Profession } from "../profession/profession.entity";
import { Image } from "../image/image.entity";
import { Trial } from "../trial/trial.entity";
import { ModifierAssignment } from "../modifier_assignment/modifierAssignment.entity";
import { Modifier } from "../modifier/modifier.entity";
import { Combat, CombatModifiers } from "../combat/combat.entity";

dotenv.config();
const { DB_PATH } = process.env;

export const appDataSource = new DataSource({
  type: "sqlite",
  database: `${DB_PATH}`,
  entities: [
    God,
    GodWithModifiers,
    Competitor,
    CompetitorModifiers,
    TemporaryCompetitor,
    Profession,
    Image,
    Trial,
    ModifierAssignment,
    Combat,
    CombatModifiers,
    Modifier,
  ],
  synchronize: true,
  logging: true,
});
