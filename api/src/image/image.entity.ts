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
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column()
  type: string;

  @Field()
  @Column()
  path: string;

  @OneToMany(() => God, (god) => god.image)
  god: God[];

  @OneToMany(() => Competitor, (avatarImage) => avatarImage.id)
  idAvatarImage: Competitor[];

  @OneToMany(() => Competitor, (battleImage) => battleImage.id)
  idBattleImage: Competitor[];

  @OneToMany(() => Profession, (profession) => profession.id)
  idImageProfession: Profession[];

  @OneToMany(() => Trial, (trial) => trial.id)
  imageTrial: Trial;
}
