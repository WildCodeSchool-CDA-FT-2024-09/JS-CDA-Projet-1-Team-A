import "reflect-metadata";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Competitor } from "../competitor/competitor.entity";
import { ModifierAssignement } from "../modifier_assignement/modifierAssignement.entity";
import { Image } from "../image/image.entity";

@ObjectType()
@Entity()
export class Profession extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => Competitor)
  @OneToMany(() => Competitor, (profession) => profession)
  profession: Competitor;

  @Field(() => [Image])
  @ManyToOne(() => Image, (image) => image.id)
  image: Image;

  @Field(() => [ModifierAssignement], { nullable: true })
  modifierAssignements?: ModifierAssignement[];
}
