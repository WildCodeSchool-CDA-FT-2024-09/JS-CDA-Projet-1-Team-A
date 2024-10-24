import "reflect-metadata";
import { BaseEntity, Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";

import { ModifierAssignement } from "../modifier_assignement/modifierAssignement.entity";

@ObjectType()
@Entity()
export class Modifier extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  label: string;

  @Field(() => [ModifierAssignement])
  @OneToMany(() => ModifierAssignement, (modifier) => modifier)
  modifier: ModifierAssignement[];
}
