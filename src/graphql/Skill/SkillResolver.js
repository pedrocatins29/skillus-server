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
  Skill: {
    category(parent) {
      return skillModel.getCategory(parent.skill_category_id);
    },
  },
};
