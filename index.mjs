import express from "express"
import schema from "./schema.mjs"
import { graphqlHTTP } from "express-graphql"


const { PORT, TARGET } = process.env
const graphiql = TARGET !== "production"
const gql = graphqlHTTP({ schema, graphiql })


express()
  .use('/', gql)
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
