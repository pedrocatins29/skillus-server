import { ratingModel } from "../../models/RatingModel";

export const ratingResolver = {
    Query: {
        ratings(_, args) {
            return ratingModel.listByUser(args.user_id);
        },
    },
};
