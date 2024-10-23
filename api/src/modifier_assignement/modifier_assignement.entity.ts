import "reflect-metadata";
import { BaseEntity, Entity, Column, PrimaryColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Modifer_assignement extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @PrimaryColumn()
  id_modifier: number;

  @Field()
  @PrimaryColumn()
  id_modified_entity: string;

  @Field()
  @Column()
  modified_entity_type: string;

  @Field()
  @Column()
  value: number;

  @Field()
  @Column()
  value_type: string;
}
