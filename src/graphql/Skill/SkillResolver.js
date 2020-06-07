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

  Mutation: {
    createSkill(_, args) {
      skillModel.new(args.name, args.category_id);
    },
  },

  Skill: {
    category(parent) {
      return skillModel.getCategory(parent.skill_category_id);
    },
  },
};
