import "reflect-metadata";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Competitor } from "../competitor/competitor.entity";
import { Modifer_assignement } from "../modifier_assignement/modifier_assignement.entity";
import { Image } from "../image/image.entity";

@ObjectType()
@Entity()
export class Profession extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => Competitor)
  @OneToMany(() => Competitor, (profession_id) => profession_id.id)
  profession_id: Competitor;

  @Field(() => Modifer_assignement)
  @OneToMany(
    () => Modifer_assignement,
    (id_modified_entity) => id_modified_entity.id
  )
  id_modified_entity: Modifer_assignement;

  @Field(() => [Image])
  @ManyToOne(() => Image, (image) => image.id)
  Images: Image[];
}
