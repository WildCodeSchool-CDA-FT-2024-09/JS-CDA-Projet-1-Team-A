//import { GraphQLJSONObject } from "graphql-scalars";
import { God } from "../god/god.entity";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Competitor } from "../competitor/competitor.entity";
import { Trial } from "../trial/trial.entity";
import { Modifer_assignement } from "../modifier_assignement/modifier_assignement.entity";
//import { ResultStats } from "./combat.type";

@ObjectType()
@Entity()
export class Combat extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  resultShortText: string;

  @Field()
  @Column()
  resultLongText: string;

  @Field(() => God)
  @ManyToOne(() => God, (player_god) => player_god.id)
  @JoinColumn()
  player_god: God;

  @Field(() => God)
  @ManyToOne(() => God, (opponent_god) => opponent_god.id)
  @JoinColumn()
  opponent_god: God;

  @Field(() => Competitor)
  @ManyToOne(() => Competitor, (player_id) => player_id.id)
  @JoinColumn()
  player: Competitor;

  @Field(() => Competitor)
  @ManyToOne(() => Competitor, (opponent_id) => opponent_id)
  @JoinColumn()
  opponent: Competitor;

  @Field(() => Trial)
  @ManyToOne(() => Trial, (trial_id) => trial_id.id)
  @JoinColumn()
  trial: Trial;

  @Field(() => [Modifer_assignement])
  @OneToMany(() => Modifer_assignement, (stat) => stat.modifiedEntity)
  @JoinColumn()
  assignementStats: Modifer_assignement[];
}
