import "reflect-metadata";
import { ApolloServer, ExpressContext } from "apollo-server-express";
import express, { Express } from "express";
import { buildSchema } from "type-graphql";
import { UsersResolver } from "./modules/users/graphql/resolvers/UsersResolver";
import { connect } from "./config/database";
import { PetsResolver } from "./modules/pets/graphql/resolvers/PetsResolver";
import { User } from "./modules/users/database/entities/User";

export class App {
  private app: Express;
  private apolloServer: ApolloServer<ExpressContext>;
  private port: number = 4010;

  private async init() {
    await connect();
    this.app = express();
    const schema = await buildSchema({
      resolvers: [UsersResolver, PetsResolver],
    });

    this.apolloServer = new ApolloServer({ schema });
    await this.apolloServer.start();
  }

  private middlewares() {
    this.apolloServer.applyMiddleware({ app: this.app });
  }

  async start() {
    await this.init();
    this.middlewares();
    this.app.listen(this.port, () =>
      console.log(`Apollo server started at port ${this.port}`)
    );

    const newUser = Object.assign(new User(), {
      firstname: "Marcelo",
      lastname: "Ragnelli",
      email: "mrfrigerio@yahoo.com.br",
      password: "123abc",
    } as User);
    await newUser.save();
  }
}
