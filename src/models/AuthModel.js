import { compare } from "bcrypt";
import { verify } from "jsonwebtoken";
import { createAccessToken, createRefreshToken, sendRefreshToken } from "../controller/Auth/token";
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

    logout(context) {
        sendRefreshToken(context.res, "");
        return true;
    },

    // async revokeRefreshTokensForUser(userId) {
    //   const response = await db.query(
    //     `UPDATE user SET tokenVersion = tokenVersion+1 WHERE (id = ${userId});`
    //   );
    //   return true;
    // },

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
