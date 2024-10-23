import "reflect-metadata";
import { BaseEntity, Entity, Column, PrimaryColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Competitor extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  id_avatar_image: string;

  @Field()
  @Column()
  id_battle_image: string;

  @Field()
  @Column()
  status: string;

  @Field()
  @Column()
  createsAt: Date;

  @Field()
  @Column()
  updatedAt: Date;

  @Field()
  @Column()
  profession_id: string;
}
