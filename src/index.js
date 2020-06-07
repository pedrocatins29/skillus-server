import express from "express";
import "dotenv/config";
import "regenerator-runtime/runtime.js";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
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
import { refreshToken } from "./controller/Auth/refreshToken";
import { problemResolver } from "./graphql/Problem/ProblemResolver";
import { problemType } from "./graphql/Problem/ProblemType";
import morgan from "morgan";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    // maxAge: 86400,
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("tiny"));

app.use("/refresh_token", cookieParser());

app.post("/refresh_token", refreshToken);

const port = process.env.PORT || 4000;

const apolloServer = new ApolloServer({
  playground: true,
  introspection: true,
  typeDefs: [
    userType,
    queryType,
    skillType,
    contactType,
    mutationType,
    AuthType,
    problemType,
  ],
  resolvers: [
    userResolver,
    skillResolver,
    errorResolver,
    AuthResolver,
    problemResolver,
  ],
  context: ({ req, res }) => ({ req, res }),
  formatError: (err) => {
    if (
      err.message.startsWith(
        "ER_PARSE_ERROR: You have an error in your SQL syntax;"
      )
    ) {
      return new Error("Internal server error");
    }

    return err;
  },
});

apolloServer.applyMiddleware({ app, cors: false });

app.listen(port, () => {
  console.log("API RODANDO COM SUCESSO");
});
