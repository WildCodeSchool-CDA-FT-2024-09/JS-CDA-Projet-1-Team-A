import "reflect-metadata";
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { God } from "../god/god.entity";
import { Competitor } from "../competitor/competitor.entity";
import { Profession } from "../profession/profession.entity";
import { Trial } from "../trial/trial.entity";

@ObjectType()
@Entity()
export class Image extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  path: string;

  @Field(() => God)
  @OneToMany(() => God, (god) => god.image)
  god: God[];

  @Field(() => Competitor)
  @OneToMany(() => Competitor, (id_avatar_image) => id_avatar_image.id)
  id_avatar_image: Competitor[];

  @Field(() => Competitor)
  @OneToMany(() => Competitor, (id_battle_image) => id_battle_image.id)
  id_battle_image: Competitor[];

  @Field(() => Profession)
  @OneToMany(() => Profession, (id_image_profession) => id_image_profession.id)
  id_image_profession: Profession[];

  @Field(() => Trial)
  @OneToMany(() => Trial, (id_image_trial) => id_image_trial.id)
  id_image_trial: Trial[];
}
