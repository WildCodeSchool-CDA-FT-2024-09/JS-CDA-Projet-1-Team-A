import "reflect-metadata";
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Image } from "../image/image.entity";
import { Combat } from "../combat/combat.entity";
import { Modifer_assignement } from "../modifier_assignement/modifier_assignement.entity";

@ObjectType()
@Entity()
export class God extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => Image)
  @ManyToOne(() => Image, (image) => image.id)
  @JoinColumn()
  image: Image[];

  @Field(() => Combat)
  @OneToOne(() => Combat, (player_god_id) => player_god_id.id)
  player_god_id: Combat[];

  @Field(() => Combat)
  @OneToOne(() => Combat, (opponent_god_id) => opponent_god_id.id)
  opponent_god_id: Combat[];

  @Field(() => Modifer_assignement)
  @ManyToOne(
    () => Modifer_assignement,
    (id_modified_entity) => id_modified_entity.id
  )
  id_modified_entity: Modifer_assignement[];
}
