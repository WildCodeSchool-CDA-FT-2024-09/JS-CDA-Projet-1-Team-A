import "reflect-metadata";
import {
  BaseEntity,
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { God } from "../god/god.entity";
import { Modifier } from "../modifier/modifier.entity";
import { Competitor } from "../competitor/competitor.entity";

@ObjectType()
@Entity()
export class Modifer_assignement extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Field()
  @Column()
  value: number;

  @Field()
  @Column()
  valueType: string;

  @Field(() => God)
  @ManyToOne(() => God, (god) => god.id)
  @JoinColumn()
  modifiedEntity: God;

  @Field(() => Modifier)
  @ManyToOne(() => Modifier, (modifier) => modifier)
  @JoinColumn()
  modifier: Modifier;

  @Field(() => Competitor)
  @OneToMany(
    () => Competitor,
    (id_modified_entity_competitor) => id_modified_entity_competitor.id
  )
  @JoinColumn()
  ModifiedEntityCompetitor: Competitor;
}
