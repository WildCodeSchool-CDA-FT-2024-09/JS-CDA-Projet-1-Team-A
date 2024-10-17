import "reflect-metadata";
import * as dotenv from "dotenv";
import { buildSchema } from "type-graphql";
import { appDataSource } from "./db/db-client";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import TestResolver from "./test/test.resolver";

dotenv.config();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

(async () => {
  await appDataSource.initialize();
  const schema = await buildSchema({
    resolvers: [TestResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });

  console.info(`🚀  Server ready at: ${url}`);
})();
