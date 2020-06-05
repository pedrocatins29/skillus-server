import { gql } from "apollo-server";

export const userType = gql`
  type User {
    id: ID
    name: String
    email: String
    telephone: String
    dateCreation: String
    status: String
    media: Float
    description: String
    photo: String
    skill: [Skill]
    contact: [Contact]
  }
`;
