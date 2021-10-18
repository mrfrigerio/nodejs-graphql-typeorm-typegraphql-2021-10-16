import { Query, Resolver } from "type-graphql";

@Resolver()
export class PetsResolver {
  private users = ["user1", "user2", "user3"];
  @Query((returns) => [String], { name: "listUsers" })
  getPets() {
    return this.users;
  }
}
