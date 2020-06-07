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
    createSkill(name: String, category_id: Int): Skill
    logout: Boolean
    createProblem(
      name: String
      description: String
      date_creation: String
      createdBy: Int
      skill: [Int]
    ): Boolean
  }
`;
