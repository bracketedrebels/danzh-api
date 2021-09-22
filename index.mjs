import express from "express"
import schemaFactory from "./schema.mjs"
import { graphqlHTTP } from "express-graphql"
import { createClient } from "redis"


const { PORT, TARGET, DB_HOST, DB_PORT, DB_PASSWORD } = process.env
const graphiql = TARGET !== "production"
const redisClient = createClient({host: DB_HOST, port: DB_PORT, no_ready_check: true, password: DB_PASSWORD })
const schema = schemaFactory(redisClient);
const gql = graphqlHTTP({ schema, graphiql })

express()
  .use('/', gql)
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
 