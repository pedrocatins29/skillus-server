import { gql } from "apollo-server";

export const problemType = gql`
    type Problem {
        id: ID
        name: String
        description: String
        date_creation: String
        date_close: String
        status: String
        creator: User
        helper: User
        comment: Comment
        color: String
        icon: String
        skill: [Skill]
    }

    type Comment {
        id: ID
        text: String
        date_creation: String
    }
`;
