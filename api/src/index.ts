import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { appDataSource } from "./db/data.source";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import TestResolver from "./test/test.resolver";

(async () => {
  await appDataSource.initialize();
  const schema = await buildSchema({
    resolvers: [TestResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.info(`🚀  Server ready at: ${url}`);
})();
