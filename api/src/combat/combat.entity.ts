//import { GraphQLJSONObject } from "graphql-scalars";
import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
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
  player_god_id: string;

  @Field()
  @Column()
  opponent_id: string;

  @Field()
  @Column()
  opponent_god_id: string;

  @Field()
  @Column()
  trial_id: string;

  @Field()
  @Column()
  result_short_text: string;

  @Field()
  @Column()
  result_long_text: string;

  // @Field(() => GraphQLJSONObject)
  // @Column()
  // result_stats: ResultStats;
}
