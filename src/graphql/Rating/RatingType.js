import { gql } from "apollo-server";

export const RatingType = gql`
    type Rating {
        id: ID
        problem_id: ID
        creator: User
        helper: User
        note: Float
        comment: String
    }
`;
