import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import http from "http";
import { ApolloServer, BaseContext } from "@apollo/server";
import mergedTypes from "./types";
import mergedResolvers from "./resolvers";

export async function GraphQL() {
  const app = express();
  const httpServer = http.createServer(app);
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static("uploads"));

  const graphQLServer = new ApolloServer<BaseContext>({
    typeDefs: mergedTypes,
    resolvers: mergedResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await graphQLServer.start();

  app.use(
    "/api",
    expressMiddleware(graphQLServer, {
      context: async ({ req }) => ({ req }),
    })
  );

  return app;
}
