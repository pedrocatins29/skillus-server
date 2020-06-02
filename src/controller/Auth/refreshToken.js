import { userModel } from "../../models/UserModel";
import {
  sendRefreshToken,
  createAccessToken,
  createRefreshToken,
} from "./token";
import { verify } from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  const token = req.cookies.chicoMedio;

  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }

  let payload = null;

  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    console.log(error);
    return res.send({ ok: false, accessToken: "" });
  }

  const user = await userModel.get(payload.userId);

  if (!user) {
    return res.send({ ok: false, accessToken: "" });
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ ok: false, accessToken: "" });
  }

  sendRefreshToken(res, createRefreshToken(user));

  return res.send({ ok: true, accessToken: createAccessToken(user) });
};
