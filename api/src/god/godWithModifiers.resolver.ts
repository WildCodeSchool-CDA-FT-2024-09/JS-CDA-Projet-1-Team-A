import { Query, Resolver } from "type-graphql";
import { GodWithModifiers } from "./godWithModifiersView.entity";
import { appDataSource as dataSource } from "../db/db-client";

@Resolver(GodWithModifiers)
export default class GodWithModifiersResolver {
  @Query(() => [GodWithModifiers])
  async getGodsWithModifiers() {
    const gods = await dataSource.manager.find(GodWithModifiers);
    console.info("Gods with modifiers", gods);
    return gods;
  }
}
