import { gql } from "apollo-server";

export const contactType = gql`
    type Contact {
        id: ID
        name: String
        value: String
        icon: String
    }
`;
