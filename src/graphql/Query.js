import {gql} from "apollo-server"

export const queryType = gql`
    type Query {
        user(id: ID!) : User
        users: [User]   
        skill(id: ID!) : Skill
        skills: [Skill]
    }
`;