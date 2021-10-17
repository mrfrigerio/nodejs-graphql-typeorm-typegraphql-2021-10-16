import { Query, Resolver } from "type-graphql";

@Resolver()
export class UsersResolver {
  private users = ["user1", "user2", "user3"];
  @Query((returns) => [String])
  getUsers() {
    return this.users;
  }
}
