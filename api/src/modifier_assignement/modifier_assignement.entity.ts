import "reflect-metadata";
import {
  BaseEntity,
  Entity,
  Column,
  OneToMany,
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
  value_type: string;

  @Field(() => God)
  @OneToMany(() => God, (id_modified_entity) => id_modified_entity.id)
  @JoinColumn()
  id_modified_entity: God;

  @Field(() => Modifier)
  @OneToMany(() => Modifier, (id_modifier) => id_modifier.id)
  @JoinColumn()
  id_modifier: Modifier;

  @Field(() => Competitor)
  @OneToMany(
    () => Competitor,
    (id_modified_entity_competitor) => id_modified_entity_competitor.id
  )
  @JoinColumn()
  d_modified_entity_competitor: Competitor;
}
