import "reflect-metadata";
import * as dotenv from "dotenv";
import { buildSchema } from "type-graphql";
import { appDataSource } from "./db/db-client";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import GodResolver from "./god/god.resolver";
import ProfessionResolver from "./profession/profession.resolver";
import CompetitorResolver from "./competitor/competitor.resolver";
import CombatResolver from "./combat/combat.resolver";
import ImageResolver from "./image/image.resolver";

dotenv.config();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

(async () => {
  await appDataSource.initialize();
  const schema = await buildSchema({
    resolvers: [
      GodResolver,
      CompetitorResolver,
      ProfessionResolver,
      CombatResolver,
      ImageResolver,
    ],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });

  console.info(`🚀  Server ready at: ${url}`);
})();
