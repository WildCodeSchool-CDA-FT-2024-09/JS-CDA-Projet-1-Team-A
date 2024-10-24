//import { GraphQLJSONObject } from "graphql-scalars";
import { God } from "../god/god.entity";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Competitor } from "../competitor/competitor.entity";
import { Trial } from "../trial/trial.entity";
import { ModifierAssignement } from "../modifier_assignement/modifierAssignement.entity";

@ObjectType()
@Entity()
export class Combat extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  resultShortText: string;

  @Field()
  @Column()
  resultLongText: string;

  @Field(() => God)
  @ManyToOne(() => God, (player) => player.id)
  playerGod: God;

  @Field(() => God)
  @ManyToOne(() => God, (opponent) => opponent.id)
  opponentGod: God;

  @Field(() => Competitor)
  @ManyToOne(() => Competitor, (player) => player.id)
  player: Competitor;

  @Field(() => Competitor)
  @ManyToOne(() => Competitor, (opponent) => opponent)
  opponent: Competitor;

  @Field(() => Trial)
  @ManyToOne(() => Trial, (trial) => trial.id)
  trial: Trial;

  @Field(() => [ModifierAssignement])
  @ManyToOne(() => ModifierAssignement)
  @JoinColumn({ name: "modifiedEntityId" })
  modifiedEntity: ModifierAssignement[];
}
