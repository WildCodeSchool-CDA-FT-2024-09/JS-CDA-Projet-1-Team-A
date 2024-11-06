import { Field, ObjectType } from "type-graphql";
import { ViewEntity, ViewColumn } from "typeorm";

@ObjectType()
@ViewEntity({
  expression: `
        SELECT "g"."name", "m"."label" AS "modifierLabel","ma"."valueType", "ma"."value"
        FROM "god" "g"
        LEFT JOIN "modifier_assignment" "ma" ON "ma"."modifiedEntityId" = "g"."id"
        LEFT JOIN "modifier" "m" ON "m"."id" = "ma"."modifierId"
    `,
})
export class GodWithModifiers {
  @Field()
  @ViewColumn()
  name: string;

  @Field({ nullable: true })
  @ViewColumn()
  modifierLabel: string;

  @Field({ nullable: true })
  @ViewColumn()
  valueType: string;

  @Field({ nullable: true })
  @ViewColumn()
  value: number;
}
