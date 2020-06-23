import { gql } from "apollo-server";

export const commentType = gql`
    type Comment {
        id: ID
        text: String
        date_creation: String
        problem_id: ID
        sender: User
    }
`;
