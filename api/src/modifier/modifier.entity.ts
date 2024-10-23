import "reflect-metadata";
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";

import { Modifer_assignement } from "../modifier_assignement/modifier_assignement.entity";

@ObjectType()
@Entity()
export class Modifier extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  label: string;

  @Field(() => Modifer_assignement)
  @ManyToOne(() => Modifer_assignement, (id_modifier) => id_modifier.id)
  @JoinColumn()
  id_modifier: Modifier;
}
