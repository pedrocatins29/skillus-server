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
    async createProblem(_, args) {
      const result = await problemModel.new(
        args.name,
        args.description,
        args.date_creation
      );
      const skillResult = await problemModel.newProblemSkill(
        args.skill,
        result.insertId
      );
      const problemUser = await problemModel.problemUser(
        result.insertId,
        args.createdBy
      );

      if (
        result.affectedRows &&
        skillResult.affectedRows &&
        problemUser.affectedRows
      ) {
        return true;
      }

      return new Error("Algo errado com seu problema");
    },
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
