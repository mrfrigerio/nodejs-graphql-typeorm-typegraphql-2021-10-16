import { Field, InputType } from "type-graphql";

@InputType()
export class PetInput {
  @Field()
  name: string;

  @Field()
  dtNasc: Date;

  @Field()
  userId: string;
}
