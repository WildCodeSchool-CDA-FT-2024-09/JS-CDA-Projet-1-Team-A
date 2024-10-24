import "reflect-metadata";
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Image } from "../image/image.entity";
import { Combat } from "../combat/combat.entity";
import { Modifer_assignement } from "../modifier_assignement/modifier_assignement.entity";

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
  @JoinColumn()
  images: Image[];

  @Field(() => Combat)
  @OneToMany(() => Combat, (trial_id) => trial_id.id)
  @JoinColumn()
  trialId: Combat;

  @Field(() => Modifer_assignement)
  @OneToMany(
    () => Modifer_assignement,
    (id_modifed_entity) => id_modifed_entity.id
  )
  @JoinColumn()
  idModifedEntity: Modifer_assignement;
}
