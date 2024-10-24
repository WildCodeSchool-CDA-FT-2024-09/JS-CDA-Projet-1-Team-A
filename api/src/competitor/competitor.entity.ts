import "reflect-metadata";
import {
  BaseEntity,
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Profession } from "../profession/profession.entity";
import { Image } from "../image/image.entity";
import { ModifierAssignement } from "../modifier_assignement/modifierAssignement.entity";
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

  @Field()
  @Column()
  createdAt: Date;

  @Field()
  @Column()
  updatedAt: Date;

  @Field(() => Profession)
  @ManyToOne(() => Profession, (profession) => profession)
  profession: Profession;

  @Field(() => Image)
  @ManyToOne(() => Image, (id_avatar_image) => id_avatar_image.id)
  id_avatar_image: Image;

  @Field(() => Image)
  @ManyToOne(() => Image, (image) => image.id)
  image: Image;

  @Field(() => [Combat])
  @OneToMany(() => Combat, (combat) => combat.player)
  playerCombats: Combat[];

  @Field(() => [Combat])
  @OneToMany(() => Combat, (combat) => combat.opponent)
  opponentCombats: Combat[];

  @Field(() => [ModifierAssignement])
  @ManyToOne(() => ModifierAssignement)
  @JoinColumn({ name: "modifiedEntityId" })
  modifiedEntity: ModifierAssignement[];
}
