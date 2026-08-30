import { gql } from 'graphql-request';

export const USERS_QUERY = gql`
  query Users($ids: [ID!]!) {
    users(ids: $ids) {
      id
      name
    }
  }
`;
