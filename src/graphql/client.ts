import {GraphQLClient} from "graphql-request";

const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT ?? 'http://localhost:8082/graphql';

export const graphqlClient = new GraphQLClient(endpoint);