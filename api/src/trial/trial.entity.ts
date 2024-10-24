import "reflect-metadata";
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Image } from "../image/image.entity";
import { Combat } from "../combat/combat.entity";
import { ModifierAssignement } from "../modifier_assignement/modifierAssignement.entity";

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
  images: Image[];

  @Field(() => Combat)
  @OneToMany(() => Combat, (trial_id) => trial_id.id)
  trialId: Combat;

  @Field(() => [ModifierAssignement])
  @ManyToOne(() => ModifierAssignement)
  @JoinColumn({ name: "modifiedEntityId" })
  modifiedEntity: ModifierAssignement[];
}
