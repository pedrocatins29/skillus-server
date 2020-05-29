import express from "express";
import { ApolloServer } from "apollo-server-express";
import helmet from "helmet";
import cors from "cors";
import { userType } from "./graphql/User/UserType";
import { userResolver } from "./graphql/User/UserResolver";
import { queryType } from "./graphql/Query";
import { skillType } from "./graphql/Skill/SkillType";
import { contactType } from "./graphql/Contact/ContactType";
import { skillResolver } from "./graphql/Skill/SkillResolver";
import { mutationType } from "./graphql/Mutation";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    maxAge: 86400,
    credentials: true,
  })
);

const port = process.env.PORT || 4000;

const apolloServer = new ApolloServer({
  typeDefs: [userType, queryType, skillType, contactType, mutationType],
  resolvers: [userResolver, skillResolver],
  context: ({ req, res }) => ({ req, res }),
});

apolloServer.applyMiddleware({ app });

app.listen(port, () => {
  console.log("API RODANDO COM SUCESSO");
});
