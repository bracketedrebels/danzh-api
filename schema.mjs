import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

/**
 * @type {(redisCleint: ReturnType<typeof import("redis").createClient>) => GraphQLSchema}
 */
export default (redis) =>
  new GraphQLSchema({
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
          resolve: (_, { key }) => redis.get(key),
        },
      },
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
            },
          },
          resolve: (_, { key, value }) => redis.set(key, value),
        },
      },
    }),
  });
