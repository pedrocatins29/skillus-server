import { hash, compare } from "bcrypt";
import { verify } from "jsonwebtoken";
import db from "../config/connection";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "../controller/Auth/token";
import { userModel } from "./UserModel";

export const AuthModel = {
  async getMyUser(context) {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
      return null;
    }

    try {
      const token = authorization.split(" ")[1];
      const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
      return userModel.get(payload.userId);
    } catch (err) {
      return null;
    }
  },

  async revokeRefreshTokensForUser(userId){
    const response = await userModel.get(userId)
  },

  // async revokeRefreshTokensForUser(context) {
  //   sendRefreshToken(context.res, "");
  //   return true;
  // },

  async register(
    name,
    email,
    password,
    telephone,
    media,
    date_creation,
    user_status_id,
    description,
    photo
  ) {
    const hashedPassword = await hash(password, 12);
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO user(name,email,password,telephone,media,date_creation,user_status_id,description,photo)VALUES("${name}","${email}","${hashedPassword}","${telephone}",${media},"${date_creation}",${user_status_id},"${description}","${photo}")`,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  },

  async login(email, password, context) {
    const user = await userModel.findUserByParam("email", email);

    if (!user) {
      throw new Error("Usuario nao encontrado");
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      throw new Error("Usuario nao encontrado");
    }

    sendRefreshToken(context.res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      user,
    };
  },
};
