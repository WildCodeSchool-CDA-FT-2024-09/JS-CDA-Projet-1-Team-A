import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { God } from "../god/god.entity";
import { Competitor } from "../competitor/competitor.entity";
import { Profession } from "../profession/profession.entity";

dotenv.config();
const { DB_PATH } = process.env;

export const appDataSource = new DataSource({
  type: "sqlite",
  database: `${DB_PATH}`,
  entities: [God, Competitor, Profession],
  synchronize: true,
  logging: false,
});
