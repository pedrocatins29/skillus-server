import express from "express";
import { ApolloServer } from "apollo-server-express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { userType } from "./graphql/User/UserType";
import { userResolver } from "./graphql/User/UserResolver";
import { queryType } from "./graphql/Query";
import { skillType } from "./graphql/Skill/SkillType";
import { contactType } from "./graphql/Contact/ContactType";
import { skillResolver } from "./graphql/Skill/SkillResolver";

const app = express();

app.use(helmet());
// app.use(morgan("common"));
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );

const port = process.env.PORT || 4000;

const apolloServer = new ApolloServer({
  typeDefs: [userType, queryType, skillType, contactType],
  resolvers: [userResolver, skillResolver],
});

apolloServer.applyMiddleware({ app });

app.listen(port, () => {
  console.log("API RODANDO COM SUCESSO");
});

app.get("/", (req, res) => {
  res.send(
    "Hello Skillus FINALMENTE COM CICD FUNCIONANDO COM ACTIONS DO GITHUB"
  );
});
