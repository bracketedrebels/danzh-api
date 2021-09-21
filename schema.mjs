import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      echo: {
        type: GraphQLString,
        args: {
          str: {
            type: GraphQLString,
            description: "Some string to echo",
          }
        },
        resolve: (_, { str }) => str
      }
    }
  })
})