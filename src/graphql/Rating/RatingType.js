import { gql } from "apollo-server";

export const ratingType = gql`
    type Rating {
        id: ID
        problem_id: ID
        note: Float
        comment: String
        evaluator: User
    }
`;
