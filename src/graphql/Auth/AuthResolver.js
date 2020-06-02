import { AuthModel } from "../../models/AuthModel";
export const AuthResolver = {
  Mutation: {
    async register(_, args) {
      try {
        await AuthModel.register(
          args.name,
          args.email,
          args.password,
          args.telephone,
          args.media,
          args.date_creation,
          args.user_status,
          args.description,
          args.photo
        );
      } catch (error) {
        console.log(error);
        return false;
      }

      return true;
    },

    async login(_, args, context) {
      return await AuthModel.login(args.email, args.password, context);
    },

    logout(_, __, context) {
      return AuthModel.revokeRefreshTokensForUser(context);
    },
  },
};
