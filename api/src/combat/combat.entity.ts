//import { GraphQLJSONObject } from "graphql-scalars";
import { God } from "../god/god.entity";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
//import { ResultStats } from "./combat.type";

@ObjectType()
@Entity()
export class Combat extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  player_id: string;

  @Field()
  @Column()
  opponent_id: string;

  @Field()
  @Column()
  trial_id: string;

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

  // @Field(() => GraphQLJSONObject)
  // @Column()
  // result_stats: ResultStats;
}
