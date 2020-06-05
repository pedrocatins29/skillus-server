import { userModel } from "../../models/UserModel";
import { AuthModel } from "../../models/AuthModel";

export const userResolver = {
  Query: {
    async eu(_, __, context) {
      const result = await AuthModel.getMyUser(context);

      if (!result) {
        return new Error("Usuario nao encontrado");
      }
      return result;
    },
    users() {
      return userModel.all();
    },
    async user(_, args) {
      const result = await userModel.get(args.id);

      if (!result) {
        return new Error("Usuario nao encontrado");
      }
      return result;
    },
  },
  Mutation: {
    async register(_, args) {
      try {
        await userModel.register(
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
  },

  User: {
    skill(parent) {
      return userModel.getUserSkills(parent.id);
    },

    media(parent) {
      return userModel.getUserRating(parent.id);
    },

    contact(parent) {
      return userModel.getUserContacts(parent.id);
    },
  },
};
