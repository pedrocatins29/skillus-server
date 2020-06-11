import { gql } from "apollo-server";

export const skillType = gql`
    type Skill {
        id: ID
        name: String
        rating: Float
        category: Category
        color: String
        icon: String
    }

    type Category {
        id: ID
        name: String
    }
`;
