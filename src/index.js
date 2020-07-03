import express from "express";
import "dotenv/config";
import "regenerator-runtime/runtime.js";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import { refreshToken } from "./controller/Auth/refreshToken";
import morgan from "morgan";
import { apolloServer } from "./Apollo";

const app = express();

app.use(
    cors({
        origin: "https://skillus-web.vercel.app/",
        //maxAge: 86400,
        credentials: true,
    })
);

app.use(helmet());
app.use(morgan("tiny"));

app.use("/refresh_token", cookieParser());
app.post("/refresh_token", refreshToken);

const port = process.env.PORT || 4000;

apolloServer.applyMiddleware({ app, cors: false });

app.listen(port, () => {
    console.log("API RODANDO COM SUCESSO");
});
