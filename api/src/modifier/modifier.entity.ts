import "reflect-metadata";
import { BaseEntity, Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { ModifierAssignment } from "../modifier_assignment/modifierAssignment.entity";

@ObjectType()
@Entity()
export class Modifier extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  label: string;

  @Field(() => [ModifierAssignment])
  @OneToMany(
    () => ModifierAssignment,
    (modifierAssignment) => modifierAssignment
  )
  modifierAssignments: ModifierAssignment[];
}
