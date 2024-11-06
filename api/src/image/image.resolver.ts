import { Arg, Query, Resolver } from "type-graphql";
import { Image } from "./image.entity";

@Resolver(Image)
export default class ImageResolver {
  @Query(() => [Image])
  async getImage(@Arg("type", { nullable: true }) type: string) {
    if (type) {
      return await Image.find({ where: { type } });
    }
    return await Image.find();
  }
}
