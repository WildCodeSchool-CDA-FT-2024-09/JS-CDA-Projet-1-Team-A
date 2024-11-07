import "reflect-metadata";
import {
  BaseEntity,
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ViewEntity,
  ViewColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Profession } from "../profession/profession.entity";
import { Image } from "../image/image.entity";
import { Combat } from "../combat/combat.entity";
import { God } from "../god/god.entity";

@ObjectType()
@Entity()
export class Competitor extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  status: string;

  @Field(() => Profession, { nullable: true })
  @ManyToOne(() => Profession, (profession) => profession)
  profession: Profession;

  @Field(() => Image, { nullable: true })
  @ManyToOne(() => Image, (image) => image.id)
  avatarImage: Image;

  @Field(() => Image, { nullable: true })
  @ManyToOne(() => Image, (image) => image.id)
  image: Image;

  @Field(() => Image)
  @ManyToOne(() => Image, (image) => image.idBattleImage)
  battleImage: Image;

  @Field(() => God, { nullable: true })
  @ManyToOne(() => God, (god) => god.competitors)
  god: God;

  @OneToMany(() => Combat, (combat) => combat.player)
  playerCombats: Combat[];

  @OneToMany(() => Combat, (combat) => combat.opponent)
  opponentCombats: Combat[];

  @Field(() => [CompetitorModifiers], { nullable: true })
  @OneToMany(
    () => CompetitorModifiers,
    (competitorModifier) => competitorModifier.id
  )
  @JoinColumn({ name: "id" })
  modifierAssignments?: CompetitorModifiers[];

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
    FROM "competitor" "c"
    LEFT JOIN "modifier_assignment" "ma" ON "ma"."modifiedEntityId" = "c"."id"
    LEFT JOIN "modifier" "m" ON "m"."id" = "ma"."modifierId"
  `,
})
export class CompetitorModifiers {
  @Field({ nullable: true })
  @ViewColumn()
  @ManyToOne(() => Competitor, (competitor) => competitor.id)
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

@ObjectType()
export class TemporaryCompetitor extends Competitor {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  status: string;

  @Field(() => [CompetitorModifiers], { nullable: true })
  @OneToMany(
    () => CompetitorModifiers,
    (competitorModifier) => competitorModifier.id
  )
  @JoinColumn({ name: "id" })
  modifierAssignments?: CompetitorModifiers[];

  @Field({ nullable: true })
  @CreateDateColumn()
  createdAt: Date;

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date;
}
