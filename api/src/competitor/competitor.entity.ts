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
import { Profession } from "../profession/profession.entity";
import { Image } from "../image/image.entity";
import { Modifer_assignement } from "../modifier_assignement/modifier_assignement.entity";
import { Combat } from "../combat/combat.entity";

@ObjectType()
@Entity()
export class Competitor extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  status: string;

  @Field()
  @Column()
  createsAt: Date;

  @Field()
  @Column()
  updatedAt: Date;

  @Field(() => Profession)
  @ManyToOne(() => Profession, (profession_id) => profession_id.id)
  @JoinColumn()
  profession_id: Profession;

  @Field(() => Image)
  @ManyToOne(() => Image, (id_avatar_image) => id_avatar_image.id)
  @JoinColumn()
  id_avatar_image: Image;

  @Field(() => Image)
  @ManyToOne(() => Image, (id_battle_image) => id_battle_image.id)
  @JoinColumn()
  id_battle_image: Image;

  @Field(() => Modifer_assignement)
  @ManyToOne(
    () => Modifer_assignement,
    (id_modifier_entity) => id_modifier_entity.id
  )
  id_modifier_entity: Modifer_assignement;

  @Field(() => Combat)
  @ManyToOne(() => Combat, (player_id) => player_id.id)
  player_id: Combat;

  @Field(() => Combat)
  @ManyToOne(() => Combat, (opponent_id) => opponent_id.id)
  opponent_id: Combat;
}
