import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Pet } from "../../../pets/database/entities/Pet";
import { User } from "../../database/entities/User";
import { UserInput } from "../inputs/UserInput";

@Resolver(User)
export class UsersResolver {
  @Query(() => [User])
  async getUsers() {
    return User.find();
  }

  @FieldResolver()
  async pets(@Root() user: User) {
    return Pet.find({ where: { userId: user.id } });
  }

  @Mutation(() => User)
  async createUser(@Arg("userInput") userInput: UserInput) {
    const newUser = Object.assign(new User(), { ...userInput });
    await newUser.save();
    return newUser;
  }
}
