import "reflect-metadata";
import {
  BaseEntity,
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType, ID } from "type-graphql";
import { Modifier } from "../modifier/modifier.entity";

@ObjectType()
@Entity()
export class ModifierAssignement extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  value: number;

  @Field()
  @Column()
  valueType: string;

  @Field()
  @Column("uuid")
  modifiedEntityId: string;

  @Field(() => Modifier)
  @ManyToOne(() => Modifier, (modifier) => modifier)
  modifier: Modifier;

  @Field(() => ID)
  modifyEntity: string;
}
