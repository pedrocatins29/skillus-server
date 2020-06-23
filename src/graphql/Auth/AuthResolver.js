import { AuthModel } from "../../models/AuthModel";

export const AuthResolver = {
    Mutation: {
        async login(_, args, context) {
            return await AuthModel.login(args.email, args.password, context);
        },

        logout(_, __, context) {
            return AuthModel.logout(context);
        },
    },
};
