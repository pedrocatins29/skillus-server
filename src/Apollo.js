import { ApolloServer } from "apollo-server-express";
import { userType } from "./graphql/User/UserType";
import { userResolver } from "./graphql/User/UserResolver";
import { queryType } from "./graphql/Query";
import { skillType } from "./graphql/Skill/SkillType";
import { contactType } from "./graphql/Contact/ContactType";
import { skillResolver } from "./graphql/Skill/SkillResolver";
import { mutationType } from "./graphql/Mutation";
import { errorResolver } from "./graphql/Error/ErrorResolver";
import { AuthResolver } from "./graphql/Auth/AuthResolver";
import { AuthType } from "./graphql/Auth/AuthType";
import { problemResolver } from "./graphql/Problem/ProblemResolver";
import { problemType } from "./graphql/Problem/ProblemType";
import { ratingType } from "./graphql/Rating/RatingType";
import { ratingResolver } from "./graphql/Rating/RatingResolver";
import { commentType } from "./graphql/Comment/CommentType";
import { commentResolver } from "./graphql/Comment/CommentResolver";

export const apolloServer = new ApolloServer({
    playground: true,
    introspection: true,
    typeDefs: [userType, queryType, skillType, contactType, mutationType, AuthType, problemType, ratingType, commentType],
    resolvers: [userResolver, skillResolver, errorResolver, AuthResolver, problemResolver, ratingResolver, commentResolver],
    context: ({ req, res }) => ({ req, res }),
    formatError: (err) => {
        if (err.message.startsWith("ER_PARSE_ERROR: You have an error in your SQL syntax;")) {
            return new Error("Internal server error");
        }

        return err;
    },
});
