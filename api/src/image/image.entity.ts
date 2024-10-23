import "reflect-metadata";
import { BaseEntity, Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { God } from "../god/god.entity";

@ObjectType()
@Entity()
export class Image extends BaseEntity {
  @Field()
  @PrimaryColumn()
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
}
