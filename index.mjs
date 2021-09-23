import express from "express";
import schemaFactory from "./schema.mjs";
import { graphqlHTTP } from "express-graphql";
import R, { createClient } from "redis";
import { tap } from "rambda";
import { thunkify } from "ramda";

const {
  PORT = 5000,
  TARGET = "development",
  DB_HOST = "localhost",
  DB_PORT = 13717,
  DB_PASSWORD,
  DB_USER,
} = process.env;
const graphiql = TARGET !== "production";
const redis = createClient({
  socket: {
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
  },
});
const schema = schemaFactory(redis);
const gql = graphqlHTTP({ schema, graphiql });
const { info, error } = console;

redis
  .connect()
  .then(tap(thunkify(info)("Connected to redis cloud")))
  .then(() =>
    express()
      .use("/", gql)
      .listen(PORT, thunkify(info)(`Listening on ${PORT}`))
  )
  .catch(error);
