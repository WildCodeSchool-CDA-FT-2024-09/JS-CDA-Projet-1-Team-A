import "reflect-metadata";
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Image } from "../image/image.entity";
import { Combat } from "../combat/combat.entity";
import { ModifierAssignment } from "../modifier_assignment/modifierAssignment.entity";

@ObjectType()
@Entity()
export class Trial extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => [Image])
  @ManyToOne(() => Image, (image) => image.id)
  image: Image;

  @Field(() => Combat)
  @OneToMany(() => Combat, (combat) => combat.id)
  combats: Combat[];

  @Field(() => [ModifierAssignment], { nullable: true })
  modifierAssignments?: ModifierAssignment[];
}
