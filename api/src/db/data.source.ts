import { DataSource } from "typeorm";
// import * as dotenv from "dotenv";
import { Test } from "src/test/test.entities";

// dotenv.config();
// const { BACKEND_FILE } = process.env;

export const appDataSource = new DataSource({
  type: "sqlite",
  database: `./src/db/db.sqlite`,
  entities: [Test],
  synchronize: true,
  //  logging: true
});
