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
import { ModifierAssignment } from "../modifier_assignment/modifierAssignment.entity";
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

  @Field(() => [Competitor])
  @OneToMany(() => Competitor, (competitor) => competitor.profession)
  competitors: Competitor[];

  @Field(() => Image)
  @ManyToOne(() => Image, (image) => image.idImageProfession)
  image: Image;

  @Field(() => [ModifierAssignment], { nullable: true })
  modifierAssignments?: ModifierAssignment[];
}
