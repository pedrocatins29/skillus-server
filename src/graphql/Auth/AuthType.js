import { gql } from "apollo-server";

export const AuthType = gql`
  type loginResponse {
    accessToken: String
    user: User
  }
`;
