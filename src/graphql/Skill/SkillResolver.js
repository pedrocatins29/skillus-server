import { skillModel } from "../../models/SkillModel";

export const skillResolver = {
    Query: {
        skills() {
            return skillModel.all();
        },
        
        skill(_, args) {
            return skillModel.get(args.id);
        },
    },
};
