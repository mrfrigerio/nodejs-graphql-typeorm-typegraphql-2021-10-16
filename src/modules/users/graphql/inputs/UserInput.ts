import { Field, InputType } from "type-graphql";

@InputType()
export class User {
  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
