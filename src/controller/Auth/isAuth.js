// const isAuth = ({ context }, next) => {
//   const authorization = context.req.headers["authorization"];

//   if (!authorization) {
//     throw new Error({
//       message: "Usuario nao esta autenticado",
//     });
//   }

//   try {
//     const token = authorization.split(" ")[1];
//     const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
//     context.payload = payload;
//   } catch (error) {
//     console.log(error);
//     throw new Error({
//       message: "Usuario nao esta autenticado",
//     });
//   }

//   return next();
// };

// export default isAuth;
