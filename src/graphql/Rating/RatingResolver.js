import { ratingModel } from "../../models/RatingModel";
import { problemModel } from "../../models/ProblemModel";

export const ratingResolver = {
    Query: {
        ratings(_, args) {
            return ratingModel.listByUser(args.user_id);
        },
    },
    Rating: {
        async evaluator(parent) {
            return problemModel.getCreator(parent.problem_id);
        },
    },
};
