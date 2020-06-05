import { problemModel } from "../../models/ProblemModel";

export const problemResolver = {
  Query: {
    problem(_, args) {
      return problemModel.get(args.id);
    },
    problems() {
      return problemModel.all();
    },
  },
  Mutation: {
    createProblem: {},
  },
  Problem: {
    comment() {},

    createdBy(parent) {
      return problemModel.createdBy(parent.id);
    },
    skill(parent) {
      return problemModel.problemSkill(parent.id);
    },
  },
};
