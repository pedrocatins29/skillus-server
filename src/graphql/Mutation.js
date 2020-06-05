import { gql } from "apollo-server";

export const mutationType = gql`
  type Mutation {
    register(
      name: String!
      email: String!
      password: String!
      telephone: String
      media: Float
      dateCreation: String
      user_status: Int
      description: String
      photo: String
    ): Boolean

    login(email: String!, password: String!): LoginResponse

    logout: Boolean
  }
`;
