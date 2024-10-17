import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { God } from "../god/god.entity";

dotenv.config();
const { DB_PATH } = process.env;

export const appDataSource = new DataSource({
  type: "sqlite",
  database: `${DB_PATH}`,
  entities: [God],
  synchronize: true,
  logging: false,
});
