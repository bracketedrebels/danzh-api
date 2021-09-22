import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

/**
 * @type {(redisCleint: import("redis").RedisClient) => GraphQLSchema}
 */
export default (redisCleint) => new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      get: {
        type: GraphQLString,
        args: {
          key: {
            type: GraphQLString,
            description: "key to set",
          },
        },
        resolve: (_, { key }) => new Promise((r) => redisCleint.get(key, r))
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      set: {
        type: GraphQLString,
        args: {
          key: {
            type: GraphQLString,
            description: "key to set",
          },
          value: {
            type: GraphQLString,
            description: "value to set",
          }
        },
        resolve: (_, { key, value }) => new Promise((r) => redisCleint.set(key, value, () => r(value)))
      }
    },

  })
})