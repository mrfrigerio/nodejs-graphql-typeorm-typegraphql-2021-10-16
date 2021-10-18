import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import { Pet } from "../../../pets/database/entities/Pet";
import { PetInput } from "../inputs/PetInput";

@Resolver(Pet)
export class PetsResolver {
  @Query(() => [Pet])
  async getPets() {
    return Pet.find();
  }

  @Mutation(() => Pet)
  async createPet(@Arg("petInput") petInput: PetInput) {
    const newPet = Object.assign(new Pet(), { ...petInput });
    await newPet.save();
    return newPet;
  }
}
