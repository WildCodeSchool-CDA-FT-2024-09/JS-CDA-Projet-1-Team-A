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
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Profession } from "../profession/profession.entity";
import { Image } from "../image/image.entity";
import { ModifierAssignment } from "../modifier_assignment/modifierAssignment.entity";
import { Combat } from "../combat/combat.entity";

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

  @Field(() => Profession)
  @ManyToOne(() => Profession, (profession) => profession)
  profession: Profession;

  @Field(() => Image)
  @ManyToOne(() => Image, (image) => image.id)
  avatarImage: Image;

  @Field(() => Image)
  @ManyToOne(() => Image, (image) => image.id)
  image: Image;

  @OneToMany(() => Combat, (combat) => combat.player)
  playerCombats: Combat[];

  @OneToMany(() => Combat, (combat) => combat.opponent)
  opponentCombats: Combat[];

  @Field(() => [ModifierAssignment], { nullable: true })
  modifierAssignments?: ModifierAssignment[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
