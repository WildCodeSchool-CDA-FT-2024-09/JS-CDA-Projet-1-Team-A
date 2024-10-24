import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { God } from "../god/god.entity";
import { Competitor } from "../competitor/competitor.entity";
import { Profession } from "../profession/profession.entity";
import { Image } from "../image/image.entity";
import { Trial } from "../trial/trial.entity";
import { ModifierAssignement } from "../modifier_assignement/modifierAssignement.entity";
import { Modifier } from "../modifier/modifier.entity";
import { Combat } from "../combat/combat.entity";

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
    ModifierAssignement,
    Combat,
    Modifier,
  ],
  synchronize: true,
  logging: false,
});
