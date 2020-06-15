import { gql } from "apollo-server";

export const AuthType = gql`
    type LoginResponse {
        accessToken: String
        user: User
    }
`;
