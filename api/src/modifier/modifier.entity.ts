import "reflect-metadata";
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { God } from "../god/god.entity";

@ObjectType()
@Entity()
export class Modifier extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  label: string;

  @Field(() => God)
  @OneToMany(() => God, (id_modified_entity) => id_modified_entity.id)
  @JoinColumn()
  id_modified_entity: God;
}
