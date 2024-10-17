import { Query, Resolver } from "type-graphql";
import { Test } from "./test.entities";

@Resolver(Test)
export default class TestResolver {
  @Query(() => [Test])
  async GetTest() {
    const test = await Test.find();
    return test;
  }
}
