import "reflect-metadata";
import { BaseEntity, Entity, Column, PrimaryColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Test extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;
}
