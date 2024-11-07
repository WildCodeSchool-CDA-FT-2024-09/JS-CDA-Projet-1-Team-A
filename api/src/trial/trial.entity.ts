import "reflect-metadata";
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ViewEntity,
  ViewColumn,
  JoinColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Image } from "../image/image.entity";
import { Combat } from "../combat/combat.entity";

@ObjectType()
@Entity()
export class Trial extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => Image, { nullable: true })
  @ManyToOne(() => Image, (image) => image.id)
  image: Image;

  @OneToMany(() => Combat, (combat) => combat.id)
  combats: Combat[];

  @Field(() => [TrialModifiers], { nullable: true })
  @OneToMany(() => TrialModifiers, (trialModifier) => trialModifier.id)
  @JoinColumn({ name: "id" })
  modifierAssignments?: TrialModifiers[];
}

@ObjectType()
@ViewEntity({
  expression: `
    SELECT "t"."id", "m"."label" AS "modifierLabel","ma"."valueType", "ma"."value", "ma"."modifiedEntityId"
    FROM "trial" "t"
    LEFT JOIN "modifier_assignment" "ma" ON "ma"."modifiedEntityId" = "t"."id"
    LEFT JOIN "modifier" "m" ON "m"."id" = "ma"."modifierId"
  `,
})
export class TrialModifiers {
  @Field({ nullable: true })
  @ViewColumn()
  @ManyToOne(() => Trial, (trial) => trial.id)
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
