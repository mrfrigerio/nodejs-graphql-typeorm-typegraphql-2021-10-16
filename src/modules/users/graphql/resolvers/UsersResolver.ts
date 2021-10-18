import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { getRepository } from "typeorm";
import { Pet } from "../../../pets/database/entities/Pet";
import { User } from "../../database/entities/User";
import { UserInput } from "../inputs/UserInput";

@Resolver(User)
export class UsersResolver {
  @Query(() => [User])
  async getUsers() {
    const usersRepository = getRepository(User);
    return usersRepository.find();
  }

  @FieldResolver()
  async pets(@Root() user: User) {
    const petsRepository = getRepository(Pet);
    return petsRepository.find({ where: { userId: user.id } });
  }

  @Mutation(() => User)
  async createUser(@Arg("userInput") userInput: UserInput) {
    const newUser = Object.assign(new User(), { ...userInput });
    await newUser.save();
    return newUser;
  }
}
