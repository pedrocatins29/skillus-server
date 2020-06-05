import { gql } from "apollo-server";

export const mutationType = gql`
  type Mutation {
    register(
      name: String!
      email: String!
      password: String!
      telephone: String
      media: Float
      date_creation: String
      user_status: Int
      description: String
      photo: String
    ): Boolean
    login(email: String!, password: String!): LoginResponse
    logout: Boolean
    createProblem(
      name: String
      description: String
      date_creation: String
      date_close: String
      date_deadline: String
      status: Int
      createdBy: Int
      skill: Int
      type: Int
    ): Problem
  }
`;
