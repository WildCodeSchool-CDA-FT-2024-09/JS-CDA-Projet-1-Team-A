import "reflect-metadata";
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
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

  @Field(() => [Modifer_assignement])
  @OneToMany(() => Modifer_assignement, (modifier) => modifier)
  @JoinColumn()
  modifier: Modifer_assignement[];
}
