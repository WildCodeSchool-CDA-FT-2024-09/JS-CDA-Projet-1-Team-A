import { God } from "../god/god.entity";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  ViewEntity,
  ViewColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Competitor } from "../competitor/competitor.entity";
import { Trial } from "../trial/trial.entity";

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

  @Field(() => [CombatModifiers], { nullable: true })
  @OneToMany(() => CombatModifiers, (combatModifier) => combatModifier.id)
  @JoinColumn({ name: "id" })
  modifierAssignments?: CombatModifiers[];
}

@ObjectType()
@ViewEntity({
  expression: `
    SELECT "c"."id", "m"."label" AS "modifierLabel","ma"."valueType", "ma"."value", "ma"."modifiedEntityId"
    FROM "combat" "c"
    LEFT JOIN "modifier_assignment" "ma" ON "ma"."modifiedEntityId" = "c"."id"
    LEFT JOIN "modifier" "m" ON "m"."id" = "ma"."modifierId"
  `,
})
export class CombatModifiers {
  @Field()
  @ViewColumn()
  @ManyToOne(() => Combat, (combat) => combat.id)
  @JoinColumn({ name: "id" })
  id: string;

  @Field()
  @ViewColumn()
  value: number;

  @Field()
  @ViewColumn()
  valueType: string;

  @Field()
  @ViewColumn()
  modifierLabel: string;
}
