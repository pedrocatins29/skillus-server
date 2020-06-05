import { sign } from "jsonwebtoken";

export const createAccessToken = (user) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (user) => {
  console.log(user.tokenVersion);
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export const sendRefreshToken = (res, token) => {
  res.cookie("chicoMedio", token, {
    htypOnly: true,
    path: "/refresh_token",
  });
};
