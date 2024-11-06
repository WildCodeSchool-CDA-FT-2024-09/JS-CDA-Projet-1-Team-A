import "reflect-metadata";
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Image } from "../image/image.entity";
import { Combat } from "../combat/combat.entity";
import { ModifierAssignment } from "../modifier_assignment/modifierAssignment.entity";
import { Competitor } from "../competitor/competitor.entity";

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
  @ManyToOne(() => Image, { nullable: true })
  image?: Image;

  @OneToMany(() => Combat, (combat) => combat.playerGod)
  playerGodCombats: Combat[];

  @OneToMany(() => Combat, (combat) => combat.opponentGod) // Le champ doit être opponentGod
  opponentGodCombats: Combat[];

  @Field(() => [ModifierAssignment], { nullable: true })
  modifierAssignments?: ModifierAssignment[];

  ///////////////////////////////////////////
  @OneToMany(() => Competitor, (competitor) => competitor.god)
  competitors: Competitor[];
}
