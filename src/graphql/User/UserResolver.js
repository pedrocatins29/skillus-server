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
