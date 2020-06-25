import { problemModel } from "../../models/ProblemModel";

export const problemResolver = {
    Query: {
        problem(_, args) {
            return problemModel.get(args.id);
        },
        problems() {
            return problemModel.all();
        },
        problemsByUser(_, args) {
            return problemModel.allByUser(args.user_id);
        },
    },

    Mutation: {
        async createProblem(_, args) {
            const result = await problemModel.new(args.name, args.description);
            const skillResult = await problemModel.newProblemSkill(args.skill, result.insertId);
            const problemUser = await problemModel.problemUser(result.insertId, args.createdBy);

            if (result.affectedRows && skillResult.affectedRows && problemUser.affectedRows) {
                return problemModel.get(result.insertId);
            }

            return new Error("Algo errado com seu problema");
        },

        async addProblemHelper(_, args) {
            const result = await problemModel.addProblemHelper(args.problem_id, args.user_id);
            const resultStatus = await problemModel.updateProblemStatus(args.problem_id, 2);

            if (result.affectedRows && resultStatus) {
                return problemModel.get(args.problem_id);
            }

            return new Error("Erro ao tentar ingressar no problema!");
        },

        async removeProblemHelper(_, args) {
            const result = await problemModel.removeProblemHelper(args.problem_id);
            const resultStatus = await problemModel.updateProblemStatus(args.problem_id, 1);

            if (result.affectedRows && resultStatus) {
                return problemModel.get(args.problem_id);
            }
            return new Error("Erro ao tentar ingressar no problema!");
        },

        async closeProblem(_, args) {
            const result = await problemModel.closeProblem(args.problem_id, args.note, args.comment);

            if (result === true) {
                return problemModel.get(args.problem_id);
            }
        },
    },

    Problem: {
        creator(parent) {
            return problemModel.getCreator(parent.id);
        },

        helper(parent) {
            return problemModel.getHelper(parent.id);
        },

        skill(parent) {
            return problemModel.listProblemSkill(parent.id);
        },

        rating(parent) {
            return problemModel.getProblemRating(parent.id);
        },
    },
};
