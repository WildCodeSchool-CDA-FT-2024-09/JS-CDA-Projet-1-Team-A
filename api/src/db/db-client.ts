import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { God } from "../god/god.entity";
import { Competitor } from "../competitor/competitor.entity";
import {
  Profession,
  ProfessionModifiers,
} from "../profession/profession.entity";
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
    Competitor,
    Profession,
    Image,
    Trial,
    ModifierAssignment,
    Combat,
    CombatModifiers,
    Modifier,
    ProfessionModifiers,
  ],
  synchronize: true,
  logging: false,
});
