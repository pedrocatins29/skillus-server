
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

    User: {
        skill(parent) {
            return userModel.getUserSkills(parent.id)
        },

        media(parent) {
            return userModel.getUserRating(parent.id)
        },

        contact(parent) {
            return userModel.getUserContacts(parent.id);
        }
    },
};

