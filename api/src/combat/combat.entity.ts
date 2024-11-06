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
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Competitor } from "../competitor/competitor.entity";
import { Trial } from "../trial/trial.entity";
import { Image } from "../image/image.entity";

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

  // Relation avec le Dieu du joueur
  @Field(() => God, { nullable: true }) // Rendre nullable si le dieu peut ne pas exister
  @ManyToOne(() => God, { nullable: true })
  playerGod: God;

  // Relation avec le Dieu de l’adversaire
  @Field(() => God, { nullable: true }) // Rendre nullable si le dieu peut ne pas exister
  @ManyToOne(() => God, { nullable: true })
  opponentGod: God;

  // Relation avec le joueur
  @Field(() => Competitor)
  @ManyToOne(() => Competitor, (player) => player.id)
  player: Competitor;

  // Relation avec l’adversaire
  @Field(() => Competitor)
  @ManyToOne(() => Competitor, (opponent) => opponent)
  opponent: Competitor;

  // Relation avec le Trial
  @Field(() => Trial)
  @ManyToOne(() => Trial, (trial) => trial.id)
  trial: Trial;

  // Image du combat
  @Field(() => Image, { nullable: true })
  @ManyToOne(() => Image)
  image?: Image;

  @Field(() => [CombatModifiers], { nullable: true })
  @OneToMany(() => CombatModifiers, (combatModifier) => combatModifier.id)
  @JoinColumn({ name: "id" })
  modifierAssignments?: CombatModifiers[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
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
