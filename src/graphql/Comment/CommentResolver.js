import { commentModel } from "../../models/CommentModel";
import { userModel } from "../../models/UserModel";

export const commentResolver = {
    Query: {
        comments(_, args, context) {
            return commentModel.list(args.problem_id);
        },
    },

    Mutation: {
        async addProblemComment(_, args, context) {
            const response = await commentModel.new(args.text, args.problem_id, args.user_id_sender);

            if (response.affectedRows > 0) {
                return args;
            }
        },
    },

    Comment: {
        sender(parent, context, args) {
            return userModel.get(parent.user_id_sender);
        },
    },
};
