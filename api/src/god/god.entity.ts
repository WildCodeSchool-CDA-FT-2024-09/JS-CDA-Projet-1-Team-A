import "reflect-metadata";
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ViewEntity,
  ViewColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Image } from "../image/image.entity";
import { Combat } from "../combat/combat.entity";
// import { ModifierAssignment } from "../modifier_assignment/modifierAssignment.entity";

@ObjectType()
@Entity()
export class God extends BaseEntity {
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

  @OneToMany(() => Combat, (combat) => combat.player)
  playerGodCombats: Combat[];

  @OneToMany(() => Combat, (combat) => combat.opponent)
  opponentGodCombats: Combat[];

  // @Field(() => [ModifierAssignment], { nullable: true })
  // modifierAssignments?: ModifierAssignment[];

  @Field(() => [GodModifiers], { nullable: true })
  @OneToMany(() => GodModifiers, (godModifier) => godModifier.id)
  @JoinColumn({ name: "id" })
  modifierAssignments?: GodModifiers[];
}

@ObjectType()
@ViewEntity({
  expression: `
    SELECT "g"."id", "m"."label" AS "modifierLabel","ma"."valueType", "ma"."value", "ma"."modifiedEntityId"
    FROM "god" "g"
    LEFT JOIN "modifier_assignment" "ma" ON "ma"."modifiedEntityId" = "g"."id"
    LEFT JOIN "modifier" "m" ON "m"."id" = "ma"."modifierId"
  `,
})
export class GodModifiers {
  @Field({ nullable: true })
  @ViewColumn()
  @ManyToOne(() => God, (god) => god.id)
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
