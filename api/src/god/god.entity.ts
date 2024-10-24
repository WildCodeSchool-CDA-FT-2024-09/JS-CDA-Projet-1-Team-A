import "reflect-metadata";
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
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
  @OneToMany(() => Image, (image) => image.id)
  @JoinColumn()
  image: Image[];

  @Field(() => [Combat])
  @OneToMany(() => Combat, (combat) => combat.player_god)
  playerGodCombats: Combat[];

  @Field(() => [Combat])
  @OneToMany(() => Combat, (combat) => combat.opponent_god)
  opponentGodCombats: Combat[];

  @Field(() => [Modifer_assignement])
  @OneToMany(() => Modifer_assignement, (modifiedEntity) => modifiedEntity)
  modifiedEntity: Modifer_assignement[];
}
