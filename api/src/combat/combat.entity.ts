//import { GraphQLJSONObject } from "graphql-scalars";
import { God } from "../god/god.entity";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { Competitor } from "../competitor/competitor.entity";
import { Trial } from "../trial/trial.entity";
//import { ResultStats } from "./combat.type";

@ObjectType()
@Entity()
export class Combat extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  result_short_text: string;

  @Field()
  @Column()
  result_long_text: string;

  @Field(() => God)
  @OneToOne(() => God, (player_god_id) => player_god_id.id)
  @JoinColumn()
  player_god_id: God;

  @Field(() => God)
  @OneToOne(() => God, (opponent_god_id) => opponent_god_id.id)
  @JoinColumn()
  opponent_god_id: God;

  @Field(() => Competitor)
  @OneToMany(() => Competitor, (player_id) => player_id.id)
  @JoinColumn()
  player_id: Competitor;

  @Field(() => Competitor)
  @OneToMany(() => Competitor, (opponent_id) => opponent_id.id)
  @JoinColumn()
  opponent_id: Competitor;

  @Field(() => Trial)
  @OneToMany(() => Trial, (trial_id) => trial_id.id)
  @JoinColumn()
  trial_id: Trial;
}
