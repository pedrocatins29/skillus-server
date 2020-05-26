import express from "express";
import { ApolloServer } from "apollo-server-express";
import { gql } from "apollo-server";
import db from "./config/connection";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(helmet());
app.use(morgan("common"));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () =>
      new Promise((resolve, reject) => {
        db.query("select * from user", (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(JSON.stringify(result));
          }
        });
      }),
  },
};

const port = process.env.PORT || 4000;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
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
