import {GraphQLClient} from "graphql-request";

const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT ?? 'http://localhost:8082/graphql';
const username = import.meta.env.VITE_BFF_BASIC_AUTH_USERNAME;
const password = import.meta.env.VITE_BFF_BASIC_AUTH_PASSWORD;

const headers =
    username && password ?
        {
            Authorization: `Basic ${btoa(`${username}:${password}`)}`
        } : undefined;

export const graphqlClient = new GraphQLClient(endpoint, {
    headers
});