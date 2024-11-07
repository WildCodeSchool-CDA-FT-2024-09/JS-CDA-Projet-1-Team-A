import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  ViewEntity,
  ViewColumn,
  JoinColumn,
} from "typeorm";
import { Competitor } from "../competitor/competitor.entity";
import { Image } from "../image/image.entity";

@ObjectType()
@Entity()
export class Profession extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field({ nullable: true })
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column()
  description: string;

  @OneToMany(() => Competitor, (profession) => profession)
  profession: Competitor;

  @Field(() => Image, { nullable: true })
  @ManyToOne(() => Image, (image) => image.id)
  image: Image;

  @Field(() => [ProfessionModifiers], { nullable: true })
  @OneToMany(
    () => ProfessionModifiers,
    (professionModifier) => professionModifier.id
  )
  @JoinColumn({ name: "id" })
  modifierAssignments?: ProfessionModifiers[];
}

@ObjectType()
@ViewEntity({
  expression: `
  SELECT "p"."id", "m"."label" AS "modifierLabel","ma"."valueType", "ma"."value", "ma"."modifiedEntityId"
    FROM "profession" "p"
    LEFT JOIN "modifier_assignment" "ma" ON "ma"."modifiedEntityId" = "p"."id"
    LEFT JOIN "modifier" "m" ON "m"."id" = "ma"."modifierId"
  `,
})
export class ProfessionModifiers {
  @Field({ nullable: true })
  @ViewColumn()
  @ManyToOne(() => Profession, (profession) => profession.id)
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
