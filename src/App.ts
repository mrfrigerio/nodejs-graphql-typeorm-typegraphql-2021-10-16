import "reflect-metadata";
import { ApolloServer, ExpressContext } from "apollo-server-express";
import express, { Express } from "express";
import { buildSchema } from "type-graphql";
import { UsersResolver } from "./modules/users/graphql/resolvers/UsersResolver";

export class App {
  private app: Express;
  private apolloServer: ApolloServer<ExpressContext>;
  private port: number = 4010;

  constructor() {
    this.init();
  }

  private async init() {
    this.app = express();
    const schema = await buildSchema({
      resolvers: [UsersResolver],
    });

    this.apolloServer = new ApolloServer({ schema });
    await this.apolloServer.start();
    this.middlewares();
  }

  private middlewares() {
    this.apolloServer.applyMiddleware({ app: this.app });
  }

  async start() {
    this.app.listen(this.port, () =>
      console.log(`Apollo server started at port ${this.port}`)
    );
  }
}
