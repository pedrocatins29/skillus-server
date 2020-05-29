import { userModel } from "../../models/UserModel";

export const userResolver = {
  Query: {
    users() {
      return userModel.all();
    },
    user(_, args) {
      return userModel.get(args.id);
    },
  },

  Mutation: {
    async register(_, args) {
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
